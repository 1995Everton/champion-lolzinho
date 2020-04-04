import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Col, Row } from 'react-native-easy-grid';
import { 
    Left,
    List, 
    ListItem, 
    Thumbnail, 
    Body, 
    Right, 
    Button, 
    Text,
    View,
    Header,
    Item,
    Input,
    Icon,
    Container,
    Spinner,
    Content
} from 'native-base';

import axios from '../../service/axios';

import styles from './styles';

import Logo from '../../assets/logo.png';

export default class Lists extends React.Component {

    private navigation: any = null;

    constructor(props: any){
        super(props)
        this.navigation = props.navigation
        this.state = {
            champion: [],
            loading: true,
            search: '',
            message: ''
        }
    }

    componentDidMount(){
        this.loadChampions();
    }

    public loadChampions = async () => {
        const { search } = this.state as any
        this.setState({ loading: true, message: '' })
        const join = 'join=passive||id&join=passive.passive_description||id&join=description||title,blurb&join=stats||id&join=tags||id'
        const params: any = {
            s: {
                locale: "pt_BR",
                name: {
                    $cont: search
                },
            },
            sort: "name,ASC",
            limit: 150
        }
        const response: any = await axios.get(`/champion?${join}`,{ params }).catch( () => false);
        if(response){
            const { data } = response.data
            if(data.length > 0){
                this.setState({ champion: data })
            }else{
                this.setState({ message: 'Nenhum campeão encontrado' })
            }
        }
        this.setState({ loading: false })
    }

    public navigateToDetails = (champion: any) => {
        this.navigation.navigate('Details',champion)
    }

    public like = (e: any) => {
        this.setSearch(e.nativeEvent.text)
        this.loadChampions()
    }

    public setSearch = (search: string) => {
        this.setState({ search: search });
    }

    public content = () => {
        const { loading, champion, message } = this.state as any
        if(message){
            return (
                <Content>
                    <Text style={{ textAlign: "center", marginVertical: 50}}>{message}</Text>
                </Content>
            )
        }else if(loading){
            return (
                <Content>
                    <Spinner />
                </Content>
            )
        }else{
            return (
                <View>
                    <List 
                        dataArray={champion}
                        keyExtractor={ champion => String(champion.id)}
                        renderItem={({ item }) => (
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: item.icon }} />
                                </Left>
                                <Body>
                                    <Text>{item.name}</Text>
                                    <Text numberOfLines={1}>{item.description[0].title}</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => this.navigateToDetails(item)}>
                                        <Text>Detalhes</Text>
                                    </Button>
                                </Right>
                            </ListItem> 
                        )}
                    >                  
                    </List>
                </View>
            );
        }
    }

    render(){
        const { search } = this.state as any
            return (<Container>
                <Header transparent>
                    <Row style={styles.row}>
                        <Col style={styles.logo}>
                            <Thumbnail large source={Logo}/>
                        </Col>
                        <Col>
                            <Item rounded underline>
                                <Input 
                                    onChangeText={this.setSearch}
                                    onSubmitEditing={(e) => this.like(e)}
                                    value={search} 
                                    placeholder='Buscar campeão'
                                    />
                                <Icon active name='search' />
                            </Item>
                        </Col>
                    </Row>
                </Header>
                { this.content()}
            </Container>
        )
    }
}