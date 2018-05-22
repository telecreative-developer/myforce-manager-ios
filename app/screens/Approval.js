import React, { Component } from 'react'
import { StyleSheet, Alert, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import {
  Container,
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
  Label,
  FooterTab,
  Footer
} from 'native-base'
import Modal from 'react-native-modal'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import PipelineProgress from '../components/PipelineProgress'
import { connect } from 'react-redux'
import { fetchQuestionWithStep } from '../actions/questions'
import { fetchAnswer } from '../actions/answers'
import { approvePipeline, rejectPipeline } from '../actions/pipelines'
import { setNavigate } from '../actions/processor'
import LinearGradient from 'react-native-linear-gradient'
import { fetchTarget } from '../actions/targets'

const { width, height } = Dimensions.get('window')

class Approval extends Component {
  constructor() {
    super()

    this.state = {
      modalReject: false
    }
  }
  componentWillReceiveProps(props) {
    if (
      props.success.condition === true &&
      props.success.process_on === 'SUCCESS_APPROVE_PIPELINE'
    ) {
      this.handleBack()
    }

    if (
      props.success.condition === true &&
      props.success.process_on === 'SUCCESS_REJECT_PIPELINE'
    ) {
      this.handleBack()
    }
  }

  componentWillMount() {
    const { params } = this.props.navigation.state
    const { sessionPersistance } = this.props
    this.props.fetchQuestionWithStep(params.step, sessionPersistance.accessToken)
    this.props.fetchAnswer(
      params.id,
      params.id_pipeline,
      params.id_customer,
      params.step,
      sessionPersistance.accessToken
    )
    this.props.fetchTarget(moment().format('YYYY'))
  }

  handleApprove() {
    const { params } = this.props.navigation.state
    const { sessionPersistance } = this.props
    Alert.alert(
      'Approve pipeline',
      'Are you sure approve this pipeline?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK',
          onPress: () =>
            this.props.approvePipeline(
              params.id_pipeline,
              sessionPersistance.id_branch,
              params.id_customer,
              params.id,
              params.step === 7 ? params.step : params.step + 1,
              sessionPersistance.accessToken
            )
        }
      ],
      { cancelable: false }
    )
  }

  handleReject() {
    this.setState({ modalReject: true })
  }

  handleSendReject() {
    const { params } = this.props.navigation.state
    const { sessionPersistance } = this.props
    this.props.rejectPipeline(
      params.id_pipeline,
      sessionPersistance.id_branch,
      params.step,
      this.state.rejectMessage,
      sessionPersistance.accessToken
    )
    this.setState({ modalReject: false, rejectMessage: '' })
  }

  key = ({ item, index }) => index

  handleBack() {
    const { goBack } = this.props.navigation
    goBack()
    this.props.setNavigate()
  }

  render() {
    const { params } = this.props.navigation.state
    const { navigate } = this.props.navigation
    const { questionWithStep, answer, loading } = this.props
    return (
      <Container>
        <Modal isVisible={this.state.modalReject}>
          <View style={styles.modalWrapperAddPipeline}>
            <View style={styles.imageModal}>
              <Text style={styles.pipelineModalText}>REJECT</Text>
            </View>
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>Message for Reject</Label>
                  <Input
                    multiline
                    value={this.state.rejectMessage}
                    onChangeText={rejectMessage => this.setState({ rejectMessage })}
                  />
                </Item>
              </Form>
            </Content>
            <Footer>
              <FooterTab>
                <Button onPress={() => this.setState({ modalReject: false })}>
                  <Text style={styles.modalYesButton}>CANCEL</Text>
                </Button>
                <Button onPress={() => this.handleSendReject()}>
                  <Text style={styles.modalYesButton}>REJECT</Text>
                </Button>
              </FooterTab>
            </Footer>
          </View>
        </Modal>
        <Header style={styles.header}>
          <Left style={styles.backDirection}>
            <Button transparent onPress={() => this.handleBack()}>
              <Icon name="ios-arrow-back" size={25} color="#000000" />
              <Text style={styles.back}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>SALES ACTIVITY APPROVAL</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon name="ios-notifications" size={25} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={{ padding: 15 }}>
          <View style={styles.contentSalesDescription}>
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 1.5, y: 1 }}
              locations={[0, 0.5, 0.6]}
              colors={['#ee8084', '#dc6cbe', '#dc6cbe']}
              style={styles.linearGradient}>
              <H3 style={styles.detailTitleText}>Pipeline Detail</H3>
              <Grid>
                <Col style={{ flex: 0.2 }}>
                  <Text style={styles.textDetail}>Pipeline Name</Text>
                  <Text style={styles.textDetail}>Customer Name</Text>
                  <Text style={styles.textDetail}>PIC</Text>
                  <Text style={styles.textDetail}>Month</Text>
                  <Text style={styles.textDetail}>Revenue</Text>
                  <Text style={styles.textDetail}>Project Type</Text>
                </Col>
                <Col style={{ flex: 0.8 }}>
                  <Text style={styles.textDetail}>: {params.pipeline}</Text>
                  <Text style={styles.textDetail}>: {params.customers[0].name}</Text>
                  <Text style={styles.textDetail}>: {params.pics[0].name}</Text>
                  <Text style={styles.textDetail}>: {moment(params.createdAt).format('MMMM')}</Text>
                  <Text style={styles.textDetail}>: Rp {params.total}</Text>
                  <Text style={styles.textDetail}>: -</Text>
                </Col>
              </Grid>
            </LinearGradient>
          </View>
          <View style={styles.contentSalesActivity}>
            <View style={styles.contentActivityHeader}>
              <View style={styles.contentActivityLeft}>
                <H3>Sales Activity</H3>
              </View>
              <View style={styles.contentActivityRight}>
                <View>
                  <Button success onPress={() => this.props.navigation.navigate('History')}>
                    <Text>History</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 40 }}>
              <PipelineProgress currentPosition={params.step - 1} />
            </View>
            <View>
              <H3 style={styles.question}>{questionWithStep.question}</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input disabled multiline={true} value={answer.answer} style={styles.answer} />
                </Item>
              </Form>
            </View>
            <View>
              <H3 style={styles.question}>Deskripsikan aktivitas pada tahap ini</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input
                    disabled
                    multiline={true}
                    value={answer.activity_desc}
                    style={styles.answer}
                  />
                </Item>
              </Form>
            </View>
            <View>
              <H3 style={styles.question}>Minutes of Meeting</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input
                    disabled
                    multiline={true}
                    value={answer.minutes_of_meeting}
                    style={styles.answer}
                  />
                </Item>
              </Form>
            </View>
            <View>
              <H3 style={styles.question}>To Do List</H3>
              <Form>
                <Item rounded disabled style={styles.answerBox}>
                  <Input disabled multiline={true} value={answer.todo_list} style={styles.answer} />
                </Item>
              </Form>
            </View>
          </View>
        </Content>
        {(loading.condition === true && loading.process_on === 'LOADING_APPROVE_PIPELINE') ||
        (loading.condition === true && loading.process_on === 'LOADING_REJECT_PIPELINE') ? (
          <Footer style={styles.cardFooterCart}>
            <Button
              full
              style={[styles.cardButtonApprove, { width: '100%', backgroundColor: '#999999' }]}>
              <Spinner color="#FFFFFF" />
            </Button>
          </Footer>
        ) : (
          params.step !== 7 && (
            <Footer style={styles.cardFooterCart}>
              <Button full style={styles.cardButtonReject} onPress={() => this.handleReject()}>
                <Text style={styles.approve}>REJECT</Text>
              </Button>
              <Button full style={styles.cardButtonApprove} onPress={() => this.handleApprove()}>
                <Text style={styles.approve}>APPROVE</Text>
              </Button>
            </Footer>
          )
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  success: state.success,
  answer: state.answer,
  questionWithStep: state.questionWithStep,
  sessionPersistance: state.sessionPersistance,
  target: state.target
})

const mapDispatchToProps = dispatch => ({
  setNavigate: (link, data) => dispatch(setNavigate(link, data)),
  fetchTarget: year => dispatch(fetchTarget(year)),
  approvePipeline: (id_pipeline, id_branch, id_customer, id, step, accessToken) =>
    dispatch(approvePipeline(id_pipeline, id_branch, id_customer, id, step, accessToken)),
  rejectPipeline: (id_pipeline, id_branch, step, rejectMessage, accessToken) =>
    dispatch(rejectPipeline(id_pipeline, id_branch, step, rejectMessage, accessToken)),
  fetchAnswer: (id, id_pipeline, id_customer, step, accessToken) =>
    dispatch(fetchAnswer(id, id_pipeline, id_customer, step, accessToken)),
  fetchQuestionWithStep: (step, accessToken) => dispatch(fetchQuestionWithStep(step, accessToken))
})

const styles = StyleSheet.create({
  header: {
    height: 70
  },
  title: {
    fontWeight: 'bold'
  },
  formPicDirection: {
    flex: 1,
    paddingHorizontal: 30
  },
  back: {
    fontSize: 18,
    color: '#000000'
  },
  backDirection: {
    flexDirection: 'row'
  },
  modalWrapperAddPipeline: {
    width: width / 1.1,
    height: height / 1.9,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    display: 'flex'
  },
  imageModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'column'
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
  pipelineModalText: {
    marginTop: 20,
    fontSize: 18
  },
  detailTitleTextActivity: {
    fontSize: 20,
    fontWeight: 'bold',
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
  cardButtonApprove: {
    backgroundColor: '#27ae60',
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    borderRadius: 0
  },
  cardButtonReject: {
    backgroundColor: '#FF2851',
    width: '50%',
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
    justifyContent: 'center'
  },
  contentActivityHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  contentActivityLeft: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  contentActivityRight: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  contentSalesActivity: {
    backgroundColor: '#ffffff',
    minHeight: height / 1.5,
    marginBottom: 100,
    padding: 20
  },
  contentSalesDescription: {
    backgroundColor: '#ffffff',
    width: '100%',
    minHeight: height / 5,
    height: 'auto',
    marginBottom: 15
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Approval)
