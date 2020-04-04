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
    Right,
    Title,
    Spinner
} from 'native-base';
import { Col, Row } from 'react-native-easy-grid';

import styles from './styles';

import Logo from '../../assets/logo.png';
import axios from '../../service/axios';

export default class Details extends React.Component {

    private navigation: any = null;

    constructor(props: any){
        super(props)
        const { navigation, route: { params } } = props
        this.navigation = navigation
        this.state = {
            champion: params,
            loading: false,
            splash: 'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png',
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
                "champion.name": champion.name
            },
            limit: 1
        }
        const response: any = await axios.get(`/skins`,{ params }).catch( () => false);
        if(response){
            const { data } = response.data
            if(data.length > 0){
                this.setState({ splash: data[0].splash })
            }else{
                this.setState({ message: 'Não foi possivel buscar o campeão' })
            }
        }
        this.setState({ loading: false })
    }

    public navigateToList = () => {
        this.navigation.goBack()
    }

    public navigateToSkins = () => {
        const { champion } = this.state as any
        this.navigation.navigate('Skins',champion)
    }

    public content = () => {
        const { loading, message, champion, splash } = this.state as any
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
                <Content style={{ paddingHorizontal: 10, paddingVertical: 5}}>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: champion.icon}} />
                                <Body>
                                    <Text>{ champion.name }</Text>
                                    <Text note>{ champion.description[0].title }</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image 
                                    source={{ uri: splash}} 
                                    style={styles.imageBody}
                                    />
                                <Text style={{ textAlign: "justify", paddingTop: 15}}>{ champion.description[0].blurb } </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button 
                                    transparent 
                                    textStyle={{color: '#87838B'}}
                                    onPress={this.navigateToSkins}
                                    >
                                    <Icon type="FontAwesome5" name="images" />
                                    <Text>Skins</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardAtributs}>
                        <CardItem style={styles.cardAtributsTitle}>
                            <Title style={styles.cardAtributsTitleName}>Atributos Iniciais</Title>
                        </CardItem>
                        <CardItem>
                            <Icon type="FontAwesome5" active name="khanda" />
                            <Text style={styles.cardAtributsTopics}>Ataque</Text>
                            <Right>
                                <Text>{ champion.attack }</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon type="FontAwesome5" active name="shield-alt" />
                            <Text style={styles.cardAtributsTopics}>Defesa</Text>
                            <Right>
                                <Text>{ champion.defense }</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon type="FontAwesome5" active name="magic" />
                            <Text style={styles.cardAtributsTopics}>Magia</Text>
                            <Right>
                                <Text>{ champion.magic }</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon type="FontAwesome5" active name="gamepad" />
                            <Text style={styles.cardAtributsTopics}>Dificuldade</Text>
                            <Right>
                                <Text>{ champion.difficulty }</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            );
        }
    }

    render(){
        const { champion } = this.state as any
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