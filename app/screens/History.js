import React from 'react'
import { StyleSheet, View } from 'react-native'
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
	Title,
	Text
} from 'native-base'
import { connect } from 'react-redux'
import { fetchAnswers } from '../actions/answers'

class History extends React.Component {
	componentDidMount() {
		const { sessionPersistance, navigation } = this.props
		this.props.fetchAnswers(
			navigation.state.params.id,
			navigation.state.params.id_pipeline,
			navigation.state.params.id_customer,
			sessionPersistance.accessToken
		)
	}

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
					{this.props.answers.map((d, i) => (
						<Tab heading={`Step ${d.step}`} key={i}>
							<Content>
								<View style={styles.content}>
									<Text style={styles.textQuestion}>Activity Description</Text>
									<Text style={styles.textAnswer}>{d.activity_desc}</Text>
								</View>
								<View style={styles.content}>
									<Text style={styles.textQuestion}>{d.questions[0].question}</Text>
									<Text style={styles.textAnswer}>{d.answer}</Text>
								</View>
								<View style={styles.content}>
									<Text style={styles.textQuestion}>Minutes of Meeting</Text>
									<Text style={styles.textAnswer}>{d.minutes_of_meeting}</Text>
								</View>
								<View style={styles.content}>
									<Text style={styles.textQuestion}>To Do List</Text>
									<Text style={styles.textAnswer}>{d.todo_list}</Text>
								</View>
							</Content>
						</Tab>
					))}
				</Tabs>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	answers: state.answers,
	sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = dispatch => ({
	fetchAnswers: (id, id_pipeline, id_customer, accessToken) =>
		dispatch(fetchAnswers(id, id_pipeline, id_customer, accessToken))
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF'
	},
	content: {
		margin: 20,
		borderWidth: 1,
		borderRadius: 1,
		borderColor: '#e2e2e2'
	},
	textQuestion: {
		fontSize: 20,
		margin:10,
		fontWeight: 'bold'
	},
	textAnswer: {
		fontSize: 20,
		margin:10
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
