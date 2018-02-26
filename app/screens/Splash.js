import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Container } from 'native-base'
import moment from 'moment'
import logo from '../assets/images/logo-myforce-white.png'

class Splash extends Component {
	componentDidMount() {
		setTimeout(() => {
      this.props.navigation.navigate('Start')
		}, 2000)
	}

	render() {
		return (
			<Container>
				<LinearGradient
					colors={['#ee8084', '#dc6cbe']}
					style={styles.linearGradient}>
					<Image source={logo} />
				</LinearGradient>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Splash
