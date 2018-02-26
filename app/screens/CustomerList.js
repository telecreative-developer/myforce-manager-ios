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
	H3
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'

const { width, height } = Dimensions.get('window')

class CustomerList extends Component {
	constructor() {
		super()

		this.state = {
      search: '',
      data: [
        {
          customerName: 'PT Astra Graphia',
					picName: 'Nando Reza Pratama',
				},
				{
          customerName: 'PT Telecreative',
					picName: 'Kevin Hermawan',
        },
      ]
		}
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableOpacity onPress={() => this.props.setNavigate('CustomerProfile')}>
			<View style={styles.card}>
				<View style={styles.contentCard}>
					<View style={styles.cardHeader}>
						<H3 style={styles.textTitle}>{item.customerName}</H3>
							<View style={styles.viewPerson}>
								<Icon name="ios-person" color="#000000" size={15} />
								<Text style={styles.textPerson}>{item.picName}</Text>
							</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
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
				<View style={styles.searchView}>
					<Item style={styles.searchForm} rounded>
						<Input
							placeholder="Search"
						/>
						<Icon size={25} name="ios-search" />
					</Item>
				</View>
				<Content style={styles.content}>
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

const mapDispatchToProps = dispatch => {
	return {
		setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	}
}

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
		width: width / 1.5
	},
	card: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
		height: height / 8,
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
		fontSize: 14
	},
	text: {
		color: '#000000',
		fontSize: 11,
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

export default connect(null, mapDispatchToProps)(CustomerList)
