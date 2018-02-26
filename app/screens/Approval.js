import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
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
Footer } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import PipelineProgress from '../components/PipelineProgress'

const { width, height } = Dimensions.get('window')

export default class componentName extends Component {
  constructor() {
    super()

    this.state={
      data: [
        {
          question: 'Kriteria apa saja yang mereka butuhkan dari sebuah solusi ?'
        },
        {
          question: 'Deskripsikan Aktivitas pada tahap ini?'
        },
      ]
    }
  }

  key = (item,index) => index

  renderItems = ({item}) => (
    <View>
      <H3 style={styles.question}>{item.question}</H3>
      <Form>
        <Item rounded disabled style={styles.answerBox}>
          <Input multiline={true} value='Fotocopy, Print, Color, Scan, Email' style={styles.answer}/>
        </Item>
      </Form>
    </View>
  )

  render() {
    const { navigate, goBack } = this.props.navigation
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
            height: height / 5,
            marginBottom: 15,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <H3 style={styles.detailTitleText}>Pipeline Detail</H3>
            <Grid>
              <Col style={{flex: 0.2}}>
                <Text style={styles.textDetail}>Pipeline Name</Text>
                <Text style={styles.textDetail}>Customer Name</Text>
                <Text style={styles.textDetail}>PIC</Text>
                <Text style={styles.textDetail}>Month</Text>
              </Col>
              <Col style={{flex: 0.4}}>
                <Text style={styles.textDetail}>: Fuji Xerox A-200 Super Fast</Text>
                <Text style={styles.textDetail}>: PT Astra Graphia</Text>
                <Text style={styles.textDetail}>: Tom Hardy</Text>
                <Text style={styles.textDetail}>: January</Text>
              </Col>
              <Col style={{flex: 0.2}}>
                <Text style={styles.textDetail}>Revenue</Text>
                <Text style={styles.textDetail}>Project Type</Text>
              </Col>
              <Col style={{flex: 0.2}}>
                <Text style={styles.textDetail}>: Rp 200,000,000</Text>
                <Text style={styles.textDetail}>: -</Text>
              </Col>
            </Grid>
          </View>
          <View style={{
            backgroundColor: '#ffffff', 
            width: '100%', 
            minHeight: height / 1.5,
            marginBottom: 15,
            padding: 20,
          }}>
            <H3 style={styles.detailTitleText}>Sales Activity</H3>
            <View style={{
              marginVertical: 40
            }}>
              <PipelineProgress />
            </View>
            <FlatList 
              data={this.state.data}
              keyExtractor={this.key}
              renderItem={this.renderItems}
            />
          </View>
        </Content>
        <Footer style={styles.cardFooterCart}>
					<Button full style={styles.cardButtonCart}>
						<Text style={styles.approve}>APPROVE</Text>
					</Button>
				</Footer>
      </Container>
    )
  }
}

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
    fontSize: 14,
    marginTop: 10
  },
  detailTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
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
  }
})

