import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { 
    Header, 
    Thumbnail, 
    Icon, 
    Container, 
    View, 
    Text, 
    Button, 
    Content, 
    Card, 
    CardItem, 
    Left,
    Body, 
    DeckSwiper, 
    Spinner} from 'native-base';
import { Col, Row } from 'react-native-easy-grid';

import styles from './styles';

import Logo from '../../assets/logo.png';
import axios from '../../service/axios';

export default class Skins extends React.Component {

    private navigation: any = null;

    constructor(props: any){
        super(props)
        const { navigation, route: { params } } = props
        this.navigation = navigation
        this.state = {
            champion: params,
            loading: false,
            skins: [],
            message: ''
        }
    }

    componentDidMount(){
        this.loadChampion();
    }

    public loadChampion = async() => {
        const { champion } = this.state as any
        this.setState({ loading: true, message: '' })
        const params: any = {
            s: {
                "locale": "pt_BR",
                "champion.name": champion.name
            },
            limit: 50
        }
        const response: any = await axios.get(`/skins`,{ params }).catch( () => false);
        if(response){
            const { data } = response.data
            if(data.length > 0){
                this.setState({ skins: data })
            }else{
                this.setState({ message: 'Não foi possivel buscar o campeão' })
            }
        }
        this.setState({ loading: false })
    }

    public navigateToList = () => {
        // this.navigation.navigate('Details',{ name: 'Everton'})
        this.navigation.goBack()
    }

    public content = () => {
        const { loading, message, skins } = this.state as any
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
            console.log(skins)
            return (
                <View style={styles.content}>
                    <DeckSwiper
                        dataSource={skins}
                        renderItem={(skin: any) =>(
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: skin.champion.icon }} />
                                        <Body>
                                            <Text>{ skin.champion.name }</Text>
                                            <Text note>{ skin.skins_description[0].name }</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 300, flex: 1 }} source={{ uri: skin.splash }} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>Adicionar aos favoritos</Text>
                                </CardItem>
                            </Card>
                        )}
                    />
                </View>
            );
        }
    }

    render(){
        return (
            <Container>
                <Header transparent>
                    <Row style={styles.row}>
                        <Col>
                            <Thumbnail large source={Logo}/>
                        </Col>
                        <Col style={styles.backButton}>
                            <Button iconRight transparent onPress={this.navigateToList}>
                                <Icon name='arrow-back' style={styles.back} />
                            </Button>
                        </Col>
                    </Row>
                </Header>
                { this.content() }
            </Container>
        )
    }
}