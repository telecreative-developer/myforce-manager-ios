import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native'
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
	Badge,
	Button,
	Icon
} from 'native-base'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchPipelines } from '../actions/pipelines'
import request from '../assets/images/request.jpeg'
import approve from '../assets/images/approve.jpeg'

const { width, height } = Dimensions.get('window')

// class SearchableFlatlist extends Component {
//   static INCLUDES = "includes";
//   static WORDS = "words";
//   getFilteredResults() {
//     let { data, type, searchProperty, searchTerm } = this.props;
//     return data.filter(
//       item =>
//         type && type === SearchableFlatlist.WORDS
//           ? new RegExp(`\\b${searchTerm}`, "gi").test(item[searchProperty])
//           : new RegExp(`${searchTerm}`, "gi").test(item[searchProperty])
//     );
//   }
//   render() {
//     return <FlatList {...this.props} data={this.getFilteredResults()} />;
//   }
// }

class Pipeline extends Component {
	constructor() {
		super()

		this.state = {
			search: '',
			refreshing: false
		}
	}

	componentWillMount() {
		this.handleRefresh()
	}

	async handleRefresh() {
		const { sessionPersistance } = await this.props
		await this.setState({refreshing: true})
		await this.props.fetchPipelines(sessionPersistance.id_branch, sessionPersistance.accessToken)
		await this.setState({refreshing: false})
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
            <Text style={{fontSize: 16}}>{item.customers[0].name}</Text>
          </Col>
          <Col style={styles.rightPipeline}>
						<View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
							<Badge style={styles.badge}>
								{this.renderBadges(item)}
							</Badge>
						</View>
            <TouchableOpacity style={styles.more} onPress={() => this.props.setNavigate('Approval', item)}>
              <Text style={styles.viewText}>View</Text>
              <Icon name="arrow-forward" size={18} />
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
						<View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
							<Badge style={styles.badge}>
								<Text>Done</Text>
							</Badge>
						</View>
            <TouchableOpacity style={styles.more} onPress={() => this.props.setNavigate('Approval', item)}>
              <Text style={styles.viewText}>View</Text>
              <Icon name="arrow-forward" size={18} />
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
				<Header hasTabs style={styles.header}>
					<Left>
						<TouchableOpacity onPress={() => this.props.setNavigate('Profile','')}>
							{sessionPersistance.avatar !== null || sessionPersistance.avatar !== '' ? (
								<Thumbnail rounded small source={{uri: sessionPersistance.avatar}} />
							) : (
								<Thumbnail rounded small source={defaultAvatar} />
							)}
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>TEAM ACTIVITY</Text>
					</Body>
					<Right>
						<Button transparent onPress={() => this.handleRefresh()}>
							<Icon name='refresh' />
						</Button>
					</Right>
				</Header>
				<Tabs>
					<Tab heading="PIPELINE REQUEST" style={{backgroundColor: 'transparent'}}>
						<ImageBackground
						source={request}
						imageStyle={styles.cardImage}
						style={styles.bg}>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input placeholder="Search" onChangeText={search => this.setState({search})} />
								<Icon size={25} name="search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList
								onRefresh={() => this.handleRefresh()}
								refreshing={this.state.refreshing}
								data={this.props.pipelines.filter(data => data.step_process === true)}
								keyExtractor={this.key}
								renderItem={this.renderItemsRequest} />
						</View>
						</ImageBackground>
					</Tab>
					<Tab heading="APPROVED PIPELINE" style={{backgroundColor: 'transparent'}}>
						<ImageBackground
							source={approve}
							imageStyle={styles.cardImage}
							style={styles.bg}>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input placeholder="Search" />
								<Icon size={25} name="search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList 
								data={this.props.pipelines.filter(data => data.step === 7 && data.step_process === false)}
								keyExtractor={this.key}
								renderItem={this.renderItemsApprove} />
						</View>
						</ImageBackground>
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
	bg: {
		display: 'flex',
		width: width,
		flex: 1,
		backgroundColor: '#000000'
	},
	cardImage: {
		opacity: 0.5
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
		minHeight: height / 8,
		height: 'auto',
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
		marginBottom: 5,
		fontSize: 16
  },
  leftPipeline: {
    flex: 0.6
  },
  rightPipeline: {
		flex: 0.4,
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
    justifyContent: 'flex-end', 
    marginTop: 20
  },
  viewText: {
    marginRight: 10, 
    textAlign: 'right', 
    fontWeight: 'bold'
	},
	flatListView: {
		paddingHorizontal: width / 8,
		height: height
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Pipeline)
