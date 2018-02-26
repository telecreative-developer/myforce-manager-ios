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

const { width, height } = Dimensions.get('window')

class Pipeline extends Component {
	constructor() {
		super()

		this.state = {
      search: '',
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
		return (
			<Container>
				<Header style={styles.header}>
					<Left>
						<TouchableOpacity>
							<Thumbnail rounded small source={defaultAvatar} />
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMERS</Text>
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
								<Input
									placeholder="Search"
								/>
								<Icon size={25} name="ios-search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList 
							data={this.state.data}
							keyExtractor={this.key}
							renderItem={this.renderItems} />
						</View>
					</Tab>
					<Tab heading="APPROVED PIPELINE" style={{backgroundColor: 'transparent'}}>
						<View style={styles.searchView}>
							<Item style={styles.searchForm} rounded>
								<Input
									placeholder="Search"
								/>
								<Icon size={25} name="ios-search" />
							</Item>
						</View>
						<View style={styles.flatListView}>
							<FlatList 
							data={this.state.data}
							keyExtractor={this.key}
							renderItem={this.renderItems} />
						</View>
					</Tab>
				</Tabs>
			</Container>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
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

export default connect(null,mapDispatchToProps)(Pipeline)
