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

const { width, height } = Dimensions.get('window')

class Home extends Component {
  constructor() {
    super()

    this.state={
      active: 1,
			activePageFirst: true,
			activePageSecond: false,
			activePageThird: false,
      title: 'START'
    },
    
    this.handleActivePageFirst = this.handleActivePageFirst.bind(this)
		this.handleActivePageSecond = this.handleActivePageSecond.bind(this)
		this.handleActivePageThird = this.handleActivePageThird.bind(this)
  }


	renderContent() {
		const { active } = this.state
		if (active === 2) {
			return <Team />
		}  else if (active === 3) {
			return <Club />
		}
		return <Overview />
	}

	handleActivePageFirst() {
		this.setState({
			active: 1,
			activePageFirst: true,
			activePageSecond: false,
			activePageThird: false,
			title: 'OVERVIEW'
		})
	}

	handleActivePageSecond() {
		this.setState({
			active: 2,
			activePageFirst: false,
			activePageSecond: true,
			activePageThird: false,
			title: 'CUSTOMER LIST'
		})
	}

	handleActivePageThird() {
		this.setState({
			active: 3,
			activePageFirst: false,
			activePageSecond: false,
			activePageThird: true,
			title: 'TEAM'
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
							active={this.state.activePageFirst}
							onPress={() => this.handleActivePageFirst()}>
							<Icon
								name="ios-ribbon"
								size={25}
								style={{
									color: this.state.activePageFirst
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text style={styles.footerText}>OVERVIEW</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.state.activePageSecond}
							onPress={() => this.handleActivePageSecond()}>
							<Icon
								name="ios-contacts"
								size={25}
								style={{
									color: this.state.activePageSecond
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text style={styles.footerText}>MY TEAM</Text>
						</Button>
						<Button
							vertical
							style={styles.button}
							active={this.state.activePageThird}
							onPress={() => this.handleActivePageThird()}>
							<Icon
								name="ios-star"
								size={25}
								style={{
									color: this.state.activePageThird
										? '#2d84f6'
										: '#000000'
								}}
							/>
							<Text style={styles.footerText}>AG CLUB</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}

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

export default Home

