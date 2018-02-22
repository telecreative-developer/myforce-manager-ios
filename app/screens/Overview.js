import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Container,
Content,
Header,
Left,
Body,
Right,
Text,
Grid,
Col,
H1,
H2,
H3,
Thumbnail,
Badge } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import PieCharts from '../components/PieCharts'
import BarCharts from '../components/BarCharts'
import image from '../assets/images/default-avatar.png'

const { width, height } = Dimensions.get('window')

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      data: [
        {
          salesName: 'Nando Reza Pratama',
          pipelineTitle: 'Fuji Xerox A-200 Super Fast',
          customer: 'PT Astra Graphia',
          pipelineStep: 'Identify Opportunity'
        },
        {
          salesName: 'Kevin Hermawan',
          pipelineTitle: 'Fuji Xerox A-200 Super Fast',
          customer: 'PT Astra Graphia',
          pipelineStep: 'Identify Opportunity'
        },        {
          salesName: 'Rendi Simamora',
          pipelineTitle: 'Fuji Xerox A-200 Super Fast',
          customer: 'PT Astra Graphia',
          pipelineStep: 'Identify Opportunity'
        }
      ]
    }
  }

  key = (item,index) => index

  renderItems = ({item}) => (
    <View style={styles.customerPipeline}>
      <View style={styles.pipelineContent}>
        <Grid style={styles.grid}>
          <Col style={styles.leftPipeline}>
            <H2>{item.salesName}</H2>
            <Text style={styles.contentText}>{item.pipelineTitle}</Text>
            <Text>{item.customer}</Text>
          </Col>
          <Col style={styles.rightPipeline}>
            <Badge style={styles.badge}>
              <Text>Identify Needs</Text>
            </Badge>
            <TouchableOpacity style={styles.more} onPress={() => this.props.navigation.navigate('Approval')}>
              <Text style={styles.viewText}>View</Text>
              <Icon name="ios-arrow-forward" size={18} />
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>
    </View>
  )

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
          </Left>
          <Body>
            <Text style={styles.title}>OVERVIEW</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon name="ios-notifications" size={25}></Icon>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.customerHeader}>
          <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.linearGradient}>
            <Grid>
              <Col style={styles.leftCol}>
                <View style={styles.headerDirection}>
                  <Thumbnail rounded large source={image} />
                  <View style={styles.managerData}>
                    <TouchableOpacity>
                      <H3 style={styles.profileName}>Nur Muhammad Ridho</H3>
                    </TouchableOpacity>
                    <View style={styles.headerDirection}>
                      <Text style={styles.data}>Branch Manager - JKT 1</Text>
                    </View>
                  </View>
                </View>
              </Col>
              <Col style={styles.rightCol}>
                <Text style={styles.periodeText}>Year of Periode</Text>
                <H1 style={styles.year}>{moment().format('YYYY')}</H1>
              </Col>
            </Grid>
          </LinearGradient>
        </View>
        <Content style={styles.content}>
          <View style={styles.chartsDirection}>
            <View style={styles.leftCharts}>
              <PieCharts />
            </View>
            <View style={styles.rightCharts}>
              <BarCharts />
            </View>
          </View>
          <View>
            <Text style={styles.approvalText}>Approval Request</Text>
          </View>
          <FlatList 
            data={this.state.data}
            keyExtractor={this.key}
            renderItem={this.renderItems}
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
  },
  title: {
    fontWeight: 'bold'
  },
  customerHeader: {
    backgroundColor: '#ffffff', 
    width: '100%', 
    height: height / 7.6,
    marginBottom: 15
  },
  headerDirection:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 25
  },
  profileName: {
    marginTop: 5,
    marginLeft: 25,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  leftCol: {
    flex: 0.8,
  },
  rightCol: {
    flex: 0.2, 
    display: 'flex',
    justifyContent: 'center'
  },
  year: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    backgroundColor: 'transparent',
    marginTop: 5,
    textAlign: 'center'
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  },
  periodeText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#ffffff',
    textAlign: 'center'
  },
  data: {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 15,
  },
  chartsDirection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  leftCharts: {
    flex: 1,
    backgroundColor: '#ffffff', 
    width: width / 2.1, 
    height: height / 2.5, 
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightCharts: {
    backgroundColor: '#ffffff', 
    width: width / 2.1, 
    height: height / 2.5
  },
  approvalText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  customerPipeline: {
    width: '100%', 
    height: height / 8,
    backgroundColor: '#ffffff', 
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15
  },
  pipelineContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  contentText: {
    marginTop: 5,
    marginBottom: 5
  },
  leftPipeline: {
    flex: 0.8
  },
  rightPipeline: {
    flex: 0.2
  },
  grid: {
    display: 'flex', 
    alignItems: 'center'
  },
  managerData: {
    display: 'flex', 
    justifyContent: 'center'
  },
  badge: {
    backgroundColor:'#2D38F9'
  },
  more: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20
  },
  viewText: {
    marginRight: 10, 
    textAlign: 'center', 
    fontWeight: 'bold'
  }
})