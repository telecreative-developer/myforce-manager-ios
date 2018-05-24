import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import {
	Container,
	Header,
	ListItem,
	Left,
	Thumbnail,
	Text,
	Button,
	Icon,
	Body,
	Title,
	Right,
	Content
} from 'native-base'

class OrderSummary extends React.Component {
	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Order Summary</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<FlatList
						data={[]}
						keyExtractor={(item, index) => JSON.stringify(index)}
						renderItem={({ item }) => (
							<ListItem avatar>
								<Left>
									<Thumbnail source={{ uri: 'Image URL' }} />
								</Left>
								<Body>
									<Text>Kumar Pratik</Text>
									<Text note>Doing what you like will always keep you happy . .</Text>
								</Body>
								<Right>
									<Text note>3:43 pm</Text>
								</Right>
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF'
	}
})

export default OrderSummary
