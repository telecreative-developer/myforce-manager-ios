import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions,
	Alert
} from 'react-native'
import {
	Content,
	Form,
	Item,
	Input,
	Label,
	Button,
	Text,
	Spinner
} from 'native-base'

class Login extends Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: ''
		}
  }

	render() {
		return (
			<Content style={styles.paddingForm}>
				<Text
					style={{
						fontWeight: '900',
						fontSize: 28,
						marginBottom: 20,
						color: '#2f2f4f',
						textAlign: 'center'
					}}>
					Login
				</Text>
				<Form>
					<Item floatingLabel>
						<Label>Email</Label>
						<Input
							autoCapitalize = 'none'
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Password</Label>
						<Input
							secureTextEntry
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</Item>
				</Form>
				<View style={styles.button}>
          <Button rounded style={styles.loginButton}>
            <Text>Login</Text>
          </Button>
        </View>
			</Content>
		)
	}
}

const styles = StyleSheet.create({
	paddingForm: {
		paddingHorizontal: 150,
		paddingVertical: 100
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
	},
	textForgot: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 20
	},
	loginButton: {
		paddingHorizontal: 40
	}
})

export default Login
