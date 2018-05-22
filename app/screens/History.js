import React from 'react'
import { StyleSheet } from 'react-native'
import {
	Container,
	Content,
	Tabs,
	Tab,
	Header,
	Body,
	Left,
	Right,
	Button,
	Icon,
	Title
} from 'native-base'

class History extends React.Component {
	render() {
		return (
			<Container style={styles.container}>
				<Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>History</Title>
					</Body>
					<Right />
				</Header>
				<Tabs initialPage={0}>
					<Tab heading="Tab1">
						<Content />
					</Tab>
					<Tab heading="Tab2">
						<Content />
					</Tab>
					<Tab heading="Tab3">
						<Content />
					</Tab>
				</Tabs>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF'
	}
})

export default History
