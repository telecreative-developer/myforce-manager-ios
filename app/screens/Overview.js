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
import { connect } from 'react-redux'
import PieCharts from '../components/PieCharts'
import BarCharts from '../components/BarCharts'
import { fetchMyBranch } from '../actions/branches'
import image from '../assets/images/default-avatar.png'
import { setNavigate } from '../actions/processor'
import AnimatedBar from "react-native-animated-bar"

const { width, height } = Dimensions.get('window')

class Overview extends Component {

  componentWillMount() {
    const { sessionPersistance } = this.props
    this.props.fetchMyBranch(sessionPersistance.id_manager, sessionPersistance.accessToken)
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
            <TouchableOpacity style={styles.more} onPress={() => this.props.setNavigate('Approval', '')}>
              <Text style={styles.viewText}>View</Text>
              <Icon name="ios-arrow-forward" size={18} />
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>
    </View>
  )

  render() {
    const { sessionPersistance } = this.props
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
          </Left>
          <Body>
            <Text style={styles.title}>OVERVIEW</Text>
          </Body>
          <Right>
            {/* <TouchableOpacity>
              <Icon name="ios-notifications" size={25}></Icon>
            </TouchableOpacity> */}
          </Right>
        </Header>
        <View style={styles.customerHeader}>
          <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.linearGradient}>
            <Grid>
              <Col style={styles.leftCol}>
                <View style={styles.headerDirection}>
                  <Thumbnail rounded large source={image} />
                  <View style={styles.managerData}>
                    <TouchableOpacity onPress={() => this.props.setNavigate('Profile','')}>
                      <H3 style={styles.profileName}>{`${sessionPersistance.first_name} ${sessionPersistance.last_name}`}</H3>
                    </TouchableOpacity>
                    <View style={styles.headerDirection}>
                      <Text style={styles.data}>Branch Manager - {sessionPersistance.branch}</Text>
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
        <Content style={styles.content} scrollEnabled={false}>
        <Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts />
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Gross In</Text>
							<Text style={styles.chartMonth}>Monthly</Text>
							<Text style={styles.chartPercentage}>100%</Text>
							<Text style={styles.chartTargetUnder}>30 unit targets</Text>
							<Text style={styles.chartYear}>Yearly</Text>
							<AnimatedBar 
								progress={0.2}
								style={styles.bar}
								height={40}
								borderColor="#DDD"
								barColor="tomato"
								fillColor="grey"	
								borderRadius={5}
								borderWidth={5}>
									<View style={styles.row}>
										<Text style={styles.barText}>
											100%
										</Text>
									</View>
							</AnimatedBar>
							<Text style={styles.chartTarget}>360 unit targets</Text>
						</Col>
					</Grid>
					<Grid style={styles.chartsDirection}>
						<Col style={styles.leftCharts}>
							<PieCharts />
						</Col>
						<Col style={styles.rightCharts}>
							<Text style={styles.chartTitle}>Revenue ORS</Text>
							<Text style={styles.chartMonth}>Monthly</Text>
							<Text style={styles.chartPercentage}>100%</Text>
							<Text style={styles.chartTarget}>Rp. 120.000.000 Mio of</Text>
							<Text style={styles.chartTargetUnder}>Rp. 1.200.000 Mio targets</Text>
							<Text style={styles.chartYear}>Yearly</Text>
							<AnimatedBar 
								progress={0.2}
								style={styles.bar}
								height={40}
								borderColor="#DDD"
								barColor="tomato"
								fillColor="grey"	
								borderRadius={5}
								borderWidth={5}>
									<View style={styles.row}>
										<Text style={styles.barText}>
										  100%
										</Text>
									</View>
							</AnimatedBar>
							<Text style={styles.chartTarget}>Rp. 1.200.000.000 Mio of</Text>
							<Text style={styles.chartTarget}>Rp. 1.200.000.000 Mio targets</Text>
						</Col>
					</Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  sessionPersistance: state.sessionPersistance,
  myBranch: state.myBranch
})

const mapDispatchToProps = (dispatch) => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchMyBranch: (id_manager, accessToken) => dispatch(fetchMyBranch(id_manager, accessToken))
})

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
  chartTitle: {
		fontSize: 26,
		fontWeight: '900',
		marginBottom: 15
	},
	chartMonth: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	chartPercentage: {
		fontSize: 34,
		fontWeight: 'bold',
		color: '#e87e04'
  },
  chartTarget: {
		fontSize: 16,
	},
	chartTargetUnder: {
		fontSize: 16,
		marginBottom: 15
	},
	chartYear: {
		fontSize: 20,
		fontWeight: 'bold',
  },
  bar: {
		width: width / 2.5,
		marginVertical: 10,
	},
	barText: {
		fontSize: 18,
		backgroundColor: "transparent",
		color: "#FFF",
		textAlign: 'center'
  },
  row: {
		display: 'flex',
		flex: 1,
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
		height: height / 2.9,
		backgroundColor: '#fff',
		marginBottom: 10,
	},
	leftCharts: {
		flex: 0.5
	},
	rightCharts: {
		flex: 0.5,
		justifyContent: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
