import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Container, Tabs, Tab, Button, Footer, FooterTab } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Login from '../components/Login'
import logo from '../assets/images/logo-myforce-white.png'

class Start extends Component {

	render() {
		const { navigate } = this.props.navigation
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<View style={styles.banner}>
					<LinearGradient
						colors={['#ee8084', '#dc6cbe']}
						style={styles.linearGradient}>
						<Image source={logo} />
					</LinearGradient>
				</View>
				<View style={{ flex: 1 }}>
					<Login/>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#ff5666'
	},
	banner: {
		height: 450,
		backgroundColor: '#fff555'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	tab: {
		height: 200
	}
})

export default Start
