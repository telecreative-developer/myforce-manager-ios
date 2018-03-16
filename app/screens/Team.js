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
	Text
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchSales } from '../actions/sales'
import team from '../assets/images/team.jpg'

const { width, height } = Dimensions.get('window')

class Team extends Component {
	constructor() {
		super()

		this.state = {
      search: ''
		}
	}

	componentWillMount() {
		const { sessionPersistance } = this.props
		this.props.fetchSales(sessionPersistance.id_branch, sessionPersistance.accessToken)
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.setNavigate('SalesProfile', item)}>
			<ContactCardTeam name={`${item.first_name} ${item.last_name}`} />
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
						<Text style={styles.title}>MY TEAM</Text>
					</Body>
					<Right>
						{/* <TouchableOpacity>
							<Icon name="ios-notifications" size={25} />
						</TouchableOpacity> */}
					</Right>
				</Header>
				<ImageBackground
					source={team}
					imageStyle={styles.cardImage}
					style={styles.bg}>
				<View style={styles.searchView}>
					<Item style={styles.searchForm} rounded>
						<Input
							placeholder="Search"
							onChangeText={name => this.setState({ search: name })} />
						<Icon size={25} name="ios-search" />
					</Item>
				</View>
				<Content style={styles.content}>
					<FlatList
						data={this.props.sales}
						keyExtractor={this.key}
						renderItem={this.renderItems} />
				</Content>
				</ImageBackground>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	sales: state.sales,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = (dispatch) => ({
	fetchSales: (id_branch, accessToken) => dispatch(fetchSales(id_branch, accessToken)),
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
})

const styles = StyleSheet.create({
	header: {
		height: 70
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
		width: width / 1.5
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
