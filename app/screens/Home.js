import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	FlatList
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Footer,
	FooterTab,
	Right,
	Text,
	Button
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Team from './Team'
import Club from './Club'
import Overview from './Overview'
import { setActivePageHome } from '../actions/processor';
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')

class Home extends Component {

	renderContent() {
		const { active } = this.props.activePageHome
		if (active === 2) {
			return <Team />
		}  else if (active === 3) {
			return <Club />
		}
		return <Overview />
	}

	handleActivePageFirst() {
		this.props.setActivePageHome({
			title: 'OVERVIEW',
			active: 1,
			activePageFirst: true,
			activePageSecond: false,
			activePageThird: false,
			activePageFourth: false,
			activePageFifth: false
		})
	}

	handleActivePageSecond() {
		this.props.setActivePageHome({
			title: 'MY TEAM',
			active: 2,
			activePageFirst: false,
			activePageSecond: true,
			activePageThird: false,
			activePageFourth: false,
			activePageFifth: false
		})
	}

	handleActivePageThird() {
		this.props.setActivePageHome({
			title: 'TEAM',
			active: 3,
			activePageFirst: false,
			activePageSecond: false,
			activePageThird: true,
			activePageFourth: false,
			activePageFifth: false
		})
	}

	render() {
		return (
			<Container>
				{this.renderContent()}
				<Footer style={styles.footerWrap}>
					<FooterTab>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageFirst}
							onPress={() => this.handleActivePageFirst()}>
							<Icon
								name="ios-ribbon"
								size={25}
								style={{
									color: this.props.activePageHome.activePageFirst
										? '#2d84f6'
										: '#000000'
								}} />
							<Text style={{
								fontSize: 10,
								marginTop: 5,
								color: this.props.activePageHome.activePageFirst
										? '#2d84f6'
										: '#000000'
							}}>OVERVIEW</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageSecond}
							onPress={() => this.handleActivePageSecond()}>
							<Icon
								name="ios-contacts"
								size={25}
								style={{
									color: this.props.activePageHome.activePageSecond
										? '#2d84f6'
										: '#000000'
								}} />
							<Text style={{
								fontSize: 10,
								marginTop: 5,
								color: this.props.activePageHome.activePageSecond
										? '#2d84f6'
										: '#000000'
							}}>MY TEAM</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.props.activePageHome.activePageThird}
							onPress={() => this.handleActivePageThird()}>
							<Icon
								name="ios-star"
								size={25}
								style={{
									color: this.props.activePageHome.activePageThird
										? '#2d84f6'
										: '#000000'
								}} />
							<Text style={{
								fontSize: 10,
								marginTop: 5,
								color: this.props.activePageHome.activePageThird
										? '#2d84f6'
										: '#000000'
							}}>TEAM</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	activePageHome: state.activePageHome
})

const mapDispatchToProps = (dispatch) => ({
	setActivePageHome: (active) => dispatch(setActivePageHome(active))
})

const styles = StyleSheet.create({
	footerWrap: {
		height: 70
	},
	footerText: {
		fontSize: 10,
		marginTop: 5,
		color: '#000000'
	},
	button: {
		backgroundColor: 'transparent'
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

