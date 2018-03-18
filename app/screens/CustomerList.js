import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground, TouchableHighlight } from 'react-native'
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
	H3
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchCustomers } from '../actions/customers'
import { fetchPics } from '../actions/pics'
import team from '../assets/images/bg-list.jpeg'

const { width, height } = Dimensions.get('window')

class CustomerList extends Component {
	constructor() {
		super()

		this.state = {
      search: ''
		}
	}

	componentWillMount() {
		const { sessionPersistance } = this.props
		this.props.fetchPics(sessionPersistance.accessToken)
		this.props.fetchCustomers(sessionPersistance.id_branch, sessionPersistance.accessToken)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.setNavigate('CustomerProfile', item)}>
			<View style={styles.card}>
				<View style={styles.contentCard}>
					<View style={styles.cardHeader}>
						<H3 style={styles.textTitle}>{item.name}</H3>
						{this.props.pics.filter(data => data.id_customer === item.id_customer).map((d, index) => (
							<View style={styles.viewPerson} key={index}>
								<Icon name="ios-person" color="#000000" size={18} />
								<Text style={styles.textPerson}>{d.name}</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		</TouchableHighlight>
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
					<Right />
				</Header>
				<ImageBackground
					source={team}
					imageStyle={styles.cardImage}
					style={styles.bg}>
				<View style={styles.searchView}>
					<Item style={styles.searchForm} rounded>
						<Input placeholder="Search" />
						<Icon size={25} name="ios-search" />
					</Item>
				</View>
				<Content style={styles.content}>
					<FlatList
						data={this.props.customers}
						keyExtractor={this.key}
						renderItem={this.renderItems} />
				</Content>
				</ImageBackground>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	sessionPersistance: state.sessionPersistance,
	customers: state.customers,
	pics: state.pics
})

const mapDispatchToProps = dispatch => ({
	fetchCustomers: (id_branch, accessToken) => dispatch(fetchCustomers(id_branch, accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	fetchPics: (accessToken) => dispatch(fetchPics(accessToken))
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
		width: width / 1.5
	},
	card: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
		minHeight: height / 8,
		height: 'auto',
		backgroundColor: '#ffffff',
		marginBottom: '3%'
	},
	contentCard: {
		display: 'flex',
		flexDirection: 'row',
		paddingRight: 90,
		paddingLeft: 20
	},
	viewPerson: {
		flexDirection: 'row',
		marginTop: 3
	},
	textTitle: {
		color: '#000000',
		fontSize: 18,
		fontWeight: 'bold'
	},
	textPerson: {
		color: '#000000',
		marginLeft: 5,
		fontSize: 16
	},
	text: {
		color: '#000000',
		fontSize: 16,
		marginTop: 5
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 15,
		paddingBottom: 5
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
