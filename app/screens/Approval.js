import React, { Component } from 'react'
import { StyleSheet, Alert, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Container,
Content,
Header,
Left,
Body,
Right,
Text,
Grid,
Col,
H1,
H2,
H3,
Thumbnail,
Badge,
Button,
Form,
Item,
Input,
Spinner,  
Footer } from 'native-base'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import PipelineProgress from '../components/PipelineProgress'
import { connect } from 'react-redux'
import { fetchQuestionWithStep } from '../actions/questions'
import { fetchAnswer } from '../actions/answers'
import { approvePipeline } from '../actions/pipelines'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

class Approval extends Component {
  componentWillReceiveProps(props) {
    if(props.success.condition === true && props.success.process_on === 'SUCCESS_APPROVE_PIPELINE') {
      this.props.navigation.goBack()
    }
  }

  componentWillMount() {
    const { params } = this.props.navigation.state
    const { sessionPersistance } = this.props
    this.props.fetchQuestionWithStep(params.step, sessionPersistance.accessToken)
    this.props.fetchAnswer(params.id, params.id_pipeline, params.id_customer, params.step, sessionPersistance.accessToken)
  }

  handleApprove() {
    const { params } = this.props.navigation.state
    const { sessionPersistance } = this.props
    Alert.alert(
      'Approve pipeline',
      'Are you sure approve this pipeline?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => this.props.approvePipeline(params.id_pipeline, sessionPersistance.id_branch, params.id_customer, params.id, params.step, sessionPersistance.accessToken)},
      ],
      { cancelable: false }
    )
  }

  key = (item,index) => index

  render() {
    const { params } = this.props.navigation.state
    const { navigate, goBack } = this.props.navigation
    const { questionWithStep, answer, loading } = this.props
    return ( 
      <Container>
        <Header style={styles.header}>
          <Left style={styles.backDirection}>
            <Button transparent onPress={() => goBack()}>
              <Icon name="ios-arrow-back" size={25} color="#000000" />
              <Text style={styles.back}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>SALES ACTIVITY APPROVAL</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon name="ios-notifications" size={25}></Icon>
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={{padding: 15}}>
          <View style={{
            backgroundColor: '#ffffff', 
            width: '100%', 
            minHeight: height / 5,
            height: 'auto',
            marginBottom: 15}}>
						<LinearGradient
							start={{ x: 0.0, y: 0.25 }}
							end={{ x: 1.5, y: 1 }}
							locations={[0, 0.5, 0.6]}
							colors={['#ee8084', '#dc6cbe', '#dc6cbe']}
							style={styles.linearGradient}>
              <H3 style={styles.detailTitleText}>Pipeline Detail</H3>
              <Grid>
                <Col style={{flex: 0.2}}>
                  <Text style={styles.textDetail}>Pipeline Name</Text>
                  <Text style={styles.textDetail}>Customer Name</Text>
                  <Text style={styles.textDetail}>PIC</Text>
                  <Text style={styles.textDetail}>Month</Text>
                  <Text style={styles.textDetail}>Revenue</Text>
                  <Text style={styles.textDetail}>Project Type</Text>
                </Col>
                <Col style={{flex: 0.8}}>
                  <Text style={styles.textDetail}>: {params.pipeline}</Text>
                  <Text style={styles.textDetail}>: {params.customers[0].name}</Text>
                  <Text style={styles.textDetail}>: {params.pics[0].name}</Text>
                  <Text style={styles.textDetail}>: {moment(params.createdAt).format('MMMM')}</Text>
                  <Text style={styles.textDetail}>: Rp 200,000,000</Text>
                  <Text style={styles.textDetail}>: -</Text>
                </Col>
              </Grid>
            </LinearGradient>
          </View>
          <View style={{
            backgroundColor: '#ffffff', 
            width: '100%', 
            minHeight: height / 1.5,
            marginBottom: 15,
            padding: 20}}>
            <H3 style={styles.detailTitleTextActivity}>Sales Activity</H3>
            <View style={{marginVertical: 40}}>
              <PipelineProgress currentPosition={params.step} />
            </View>
            <View>
              <H3 style={styles.question}>{questionWithStep.question}</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input disabled multiline={true} value={answer.answer} style={styles.answer}/>
                </Item>
              </Form>
            </View>
            <View>
              <H3 style={styles.question}>Deskripsikan aktivitas pada tahap ini</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input disabled multiline={true} value={answer.activity_desc} style={styles.answer}/>
                </Item>
              </Form>
            </View>
          </View>
        </Content>
        {loading.condition === true && loading.process_on === 'LOADING_APPROVE_PIPELINE' ? (
          <Footer style={styles.cardFooterCart}>
            <Button full style={[styles.cardButtonCart, {backgroundColor: '#999999'}]}>
              <Spinner color='#FFFFFF' />
            </Button>
          </Footer>
        ) : (
          <Footer style={styles.cardFooterCart}>
            <Button full style={styles.cardButtonCart} onPress={() => this.handleApprove()}>
              <Text style={styles.approve}>APPROVE</Text>
            </Button>
          </Footer>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  success: state.success,
  answer: state.answer,
  questionWithStep: state.questionWithStep,
  sessionPersistance: state.sessionPersistance
})

const mapDispatchToProps = (dispatch) => ({
  approvePipeline: (id_pipeline, id_branch, id_customer, id, step, accessToken) => dispatch(approvePipeline(id_pipeline, id_branch, id_customer, id, step, accessToken)),
  fetchAnswer: (id, id_pipeline, id_customer, step, accessToken) => dispatch(fetchAnswer(id, id_pipeline, id_customer, step, accessToken)),
  fetchQuestionWithStep: (step, accessToken) => dispatch(fetchQuestionWithStep(step, accessToken))
})

const styles = StyleSheet.create({
  header: {
    height: 70,
  },
  title: {
    fontWeight: 'bold'
  },
  back: {
    fontSize: 18, 
    color: '#000000'
  },
  backDirection: {
    flexDirection: 'row'
  },
  textDetail: {
    fontSize: 16,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  detailTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff'
  },
  detailTitleTextActivity: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000'
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15
  },
  answerBox: {
    borderRadius: 0,
    marginBottom: 30,
    alignItems: 'flex-start',
    minHeight: height / 6,
    height: 'auto'
  },
  answer: {
    fontSize: 14,
    textAlignVertical: 'top',
    marginTop: 0,
    paddingTop: 0
  },
  cardFooterCart: {
		position: 'absolute',
		bottom: 0,
		height: '6%',
		backgroundColor: 'transparent'
	},
	cardButtonCart: {
		backgroundColor: '#27ae60',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
  },
  approve: {
    fontWeight: 'bold',
    fontSize: 18
  },
  linearGradient: {
		width: '100%',
		height: 'auto',
    padding: 20,
    justifyContent: 'center',
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Approval)