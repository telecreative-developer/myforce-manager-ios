import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
	Thumbnail,
	View,
	Item,
	Input,
	Text,
	Tab, 
	Tabs,
	Grid,
	Col,
	H2,
	Badge
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchPipelines } from '../actions/pipelines'

const { width, height } = Dimensions.get('window')

class Pipeline extends Component {
	constructor() {
		super()

		this.state = {
      search: ''
		}
	}

	componentWillMount() {
		const { sessionPersistance } = this.props
		this.props.fetchPipelines(sessionPersistance.id_branch, sessionPersistance.accessToken)
	}

	renderBadges(item) {
		if(item.step === 1) {
			return <Text>Identify Opportunities</Text>
		}else if(item.step === 2) {
			return <Text>Clarify Needs</Text>
		}else if(item.step === 3) {
			return <Text>Develop Criteria</Text>
		}else if(item.step === 4) {
			return <Text>Recommend a Solution</Text>
		}else if(item.step === 5) {
			return <Text>Gain Commitment</Text>
		}else if(item.step === 6) {
			return <Text>Manage Implementation</Text>
		}
	}

  key = (item,index) => index

  renderItemsRequest = ({item}) => (
    <View style={styles.customerPipeline}>
      <View style={styles.pipelineContent}>
        <Grid style={styles.grid}>
          <Col style={styles.leftPipeline}>
            <H2>{`${item.users[0].first_name} ${item.users[0].last_name}`}</H2>
            <Text style={styles.contentText}>{item.pipeline}</Text>
            <Text>{item.customers[0].name}</Text>
          </Col>
          <Col style={styles.rightPipeline}>
            <Badge style={styles.badge}>
              {this.renderBadges(item)}
            </Badge>
            <TouchableOpacity style={styles.more} onPress={() => this.props.setNavigate('Approval', item)}>
              <Text style={styles.viewText}>View</Text>
              <Icon name="ios-arrow-forward" size={18} />
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>
    </View>
	)
	
	renderItemsApprove = ({item}) => (
    <View style={styles.customerPipeline}>
      <View style={styles.pipelineContent}>
        <Grid style={styles.grid}>
          <Col style={styles.leftPipeline}>
            <H2>{`${item.users[0].first_name} ${item.users[0].last_name}`}</H2>
            <Text style={styles.contentText}>{item.pipeline}</Text>
            <Text>{item.customers[0].name}</Text>
          </Col>
          <Col style={styles.rightPipeline}>
            <Badge style={styles.badge}>
              <Text>Done</Text>
            </Badge>
            <TouchableOpacity style={styles.more} onPress={() => this.props.setNavigate('Approval', item)}>
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
				<Header hasTabs style={styles.header}>
					<Left>
						<TouchableOpacity>
							<Thumbnail rounded small source={defaultAvatar} />
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>TEAM ACTIVITY</Text>
					</Body>
					<Right>
						{/* <TouchableOpacity>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity> */}
					</Right>
				</Header>
				<Tabs>
					<Tab heading="PIPELINE REQUEST" style={{backgroundColor: 'transparent'}}>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input placeholder="Search" />
								<Icon size={25} name="ios-search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList 
								data={this.props.pipelines.filter(data => data.step_process === true)}
								keyExtractor={this.key}
								renderItem={this.renderItemsRequest} />
						</View>
					</Tab>
					<Tab heading="APPROVED PIPELINE" style={{backgroundColor: 'transparent'}}>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input placeholder="Search" />
								<Icon size={25} name="ios-search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList 
								data={this.props.pipelines.filter(data => data.step === 7 && data.step_process === false)}
								keyExtractor={this.key}
								renderItem={this.renderItemsApprove} />
						</View>
					</Tab>
				</Tabs>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	pipelines: state.pipelines,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = (dispatch) => ({
	fetchPipelines: (id_branch, accessToken) => dispatch(fetchPipelines(id_branch, accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
})

const styles = StyleSheet.create({
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	content: {
		paddingRight: width / 6,
		paddingLeft: width / 6
	},
	searchView: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20
	},
	searchForm: {
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		width: width / 1.32
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
	},
	flatListView: {
		paddingHorizontal: width / 8
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Pipeline)
