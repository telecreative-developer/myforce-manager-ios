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
	Button,
	Icon
} from 'native-base'
import ContactCardTeam from '../components/ContactCardTeam'
import defaultAvatar from '../assets/images/default-avatar.png'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchSales } from '../actions/sales'
import team from '../assets/images/team.jpg'

const { width, height } = Dimensions.get('window')

class SearchableFlatlist extends Component {
  static INCLUDES = "includes";
  static WORDS = "words";
  getFilteredResults() {
    let { data, type, searchProperty, searchTerm } = this.props;
    return data.filter(
      item =>
        type && type === SearchableFlatlist.WORDS
          ? new RegExp(`\\b${searchTerm}`, "gi").test(item[searchProperty])
          : new RegExp(`${searchTerm}`, "gi").test(item[searchProperty])
    );
  }
  render() {
    return <FlatList {...this.props} data={this.getFilteredResults()} />;
  }
}

class Team extends Component {
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
		await this.props.fetchSales(sessionPersistance.id_branch, sessionPersistance.accessToken)
		await this.setState({refreshing: false})
	}

	key = (item, index) => index

	renderItems = ({ item }) => (
		<TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.setNavigate('SalesProfile', item)}>
			<ContactCardTeam name={`${item.first_name} ${item.last_name}`} />
		</TouchableHighlight>
	)

	render() {
		const { sessionPersistance } = this.props
		return (
			<Container>
				<Header style={styles.header}>
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
						<Text style={styles.title}>MY TEAM</Text>
					</Body>
					<Right>
						<Button transparent onPress={() => this.handleRefresh()}>
							<Icon name='refresh' />
						</Button>
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
							onChangeText={search => this.setState({search})} />
						<Icon size={25} name="search" />
					</Item>
				</View>
				<View style={styles.content}>
					<SearchableFlatlist
						refreshing={this.state.refreshing}
						onRefresh={() => this.handleRefresh()}
						searchProperty='first_name'
						searchTerm={this.state.search}
						data={this.props.sales}
						keyExtractor={this.key}
						renderItem={this.renderItems} />
				</View>
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
		paddingLeft: width / 6,
		height: height
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
