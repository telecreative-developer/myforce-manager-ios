import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	FlatList,
	TouchableHighlight,
	Alert
} from 'react-native'
import {
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
	Text,
	H1,
	H2,
	H3,
	Grid,
	Col,
	Footer,
	FooterTab,
	Thumbnail,
	Button,
	Form,
	Item,
	Input,
	Label,
	Badge,
	Picker
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import { fetchPipelines, fetchPipelinesWithIdCustomer } from '../actions/pipelines'
import { fetchPicsWithIDCustomer } from '../actions/pics'
import PipelineProgress from '../components/PipelineProgress'
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')

class CustomerProfile extends Component {
	constructor() {
		super()

		this.state = {
			pipelineTabs: 'active',
			pipeline: '',
			id_pipeline: '',
			step: '',
			isModalVisibleCart: false,
			totalPrice: '0',
			cartProducts: [
				{
					picture: 'http://www.nusacopy.com/images/a/produk/rental-fotocopy-warna.jpg',
					subproduct: 'Test'
				}
			]
		}
	}

	async componentWillMount() {
		await this.props.fetchPipelinesWithIdCustomer(
			this.props.navigation.state.params.id_customer,
			this.props.sessionPersistance.accessToken
		)
		await this.props.fetchPicsWithIDCustomer(
			this.props.navigation.state.params.id_customer,
			this.props.sessionPersistance.accessToken
		)
	}

	renderPipelineTabs() {
		if (this.state.pipelineTabs === 'active') {
			return (
				<View>
					<FlatList
						data={this.props.pipelinesWithIdCustomer.filter(p => p.step !== 7 && p.lose === false)}
						keyExtractor={this.key}
						renderItem={this.renderItemsActive} />
				</View>
			)
		} else if (this.state.pipelineTabs === 'close') {
			return (
        <View>
					<FlatList
						data={this.props.pipelinesWithIdCustomer.filter(p => p.step === 7 && p.lose === false)}
						keyExtractor={this.key}
						renderItem={this.renderItemsClose} />
        </View>
			)
		} else if (this.state.pipelineTabs === 'lose') {
			return (
        <View>
          <FlatList
            data={this.props.pipelinesWithIdCustomer.filter(p => p.lose === true)}
            keyExtractor={this.key}
            renderItem={this.renderItemsLose} />
        </View>
			)
		}
	}

	key = (item, index) => index

	handleBackButton() {
		this.props.setNavigate()
		this.props.navigation.goBack()
	}

	renderTextSellingProccess() {
		const { step } = this.state
		if(step === 1) {
			return (
				<View>
					<Text style={styles.step}>STEP 1</Text>
					<Text style={styles.titleModal}>Identify Opportunities</Text>
				</View>
			)
		}else if(step === 2) {
			return (
				<View>
					<Text style={styles.step}>STEP 2</Text>
					<Text style={styles.titleModal}>Clarify Needs</Text>
				</View>
			)
		}else if(step === 3) {
			return (
				<View>
					<Text style={styles.step}>STEP 3</Text>
					<Text style={styles.titleModal}>IDENTIFY OPPORTUNITIES</Text>
				</View>
			)
		}else if(step === 4) {
			return (
				<View>
					<Text style={styles.step}>STEP 4</Text>
					<Text style={styles.titleModal}>Develop Criteria</Text>
				</View>
			)
		}else if(step === 5) {
			return (
				<View>
					<Text style={styles.step}>STEP 5</Text>
					<Text style={styles.titleModal}>Gain Commitment</Text>
				</View>
			)
		}else if(step === 6) {
			return (
				<View>
					<Text style={styles.step}>STEP 6</Text>
					<Text style={styles.titleModal}>Manage Implementation</Text>
				</View>
			)
		}
	}

	renderItemsActive = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} color={"#000"} />
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>{data.name}</Text>
						))}
					</View>
				</View>
				<View>
					{this.props.sessionPersistance.id === this.props.navigation.state.params.id ? (
						<PipelineProgress
							onPress={() => this.handleCheckStepper(item.step, item.id_pipeline, item.step_process)}
							currentPosition={item.step-1} />
					) : (
						<PipelineProgress currentPosition={item.step-1} />
					)}
				</View>
				<View style={{justifyContent: 'center', flexDirection: 'row', display: 'flex', width: '100%', paddingVertical: 20}}>
					<Button small style={{backgroundColor: '#2D38F9', height: 40 }} onPress={() => this.setState({isModalVisibleCart: true})}>
						<Text style={{fontSize: 14}}>Order Summary</Text>
					</Button>
				</View>
			</View>
		</View>
	)

	renderItemsClose = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} color={"#000"} />
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>{data.name}</Text>
						))}
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step-1} />
				</View>
				<View style={{justifyContent: 'center', flexDirection: 'row', display: 'flex', width: '100%', paddingVertical: 20}}>
					<Button small style={{backgroundColor: '#2D38F9', height: 40 }} onPress={() => this.setState({isModalVisibleCart: true})}>
						<Text style={{fontSize: 14}}>Order Summary</Text>
					</Button>
				</View>
			</View>
		</View>
	)

	renderItemsLose = ({ item }) => (
		<View style={styles.customerPipeline}>
			<View style={styles.pipelineContent}>
				<View style={styles.leftPipeline}>
					<View style={styles.pipelineTitleDirection}>
						<View style={styles.titleFlex}>
							<H2>{item.pipeline}</H2>
						</View>
						<View style={styles.badgeFlex}>
							{item.step_process && (
								<Badge style={styles.pipelineBadgeNew}>
									<Text>In progress</Text>
								</Badge>
							)}
						</View>
					</View>
					<View style={styles.picDirection}>
						<Icon name="md-contact" size={15} color={"#000"} />
						{item.pics.map((data, index) => (
							<Text key={index} style={styles.data}>{data.name}</Text>
						))}
					</View>
				</View>
				<View>
					<PipelineProgress currentPosition={item.step-1} />
				</View>
				<View style={{justifyContent: 'center', flexDirection: 'row', display: 'flex', width: '100%', paddingVertical: 20}}>
					<Button small style={{backgroundColor: '#2D38F9', height: 40 }} onPress={() => this.setState({isModalVisibleCart: true})}>
						<Text style={{fontSize: 14}}>Order Summary</Text>
					</Button>
				</View>
			</View>
		</View>
	)

	renderItemsPic = ({ item }) => (
		<View style={styles.headerDirection}>
			<Icon name="md-contact" size={15} color={"#fff"} />
			<Text style={styles.dataPic}>{item.name}</Text>
		</View>
	)

	renderItemCart = ({ item }) => {
		return (
			<ImageBackground
				source={{ uri: item.picture }}
				imageStyle={styles.cardImage}
				style={styles.itemCart}>
				<TouchableHighlight underlayColor={'transparent'}>
					<Text style={styles.itemText}>{item.subproduct}</Text>
				</TouchableHighlight>
			</ImageBackground>
		)
	}

	render() {
		const { navigate, goBack, state } = this.props.navigation
		const { params } = this.props.navigation.state
		return (
			<Container>
				<Modal isVisible={this.state.isModalVisibleCart} style={styles.modal}   
					onBackdropPress={() => this.setState({ isModalVisibleCart: false })}>
					<View style={styles.cartContent}>
						<View style={{width: '100%',alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 10,}}>
							<TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({ isModalVisibleCart: false })}>
								<Icon name="ios-close" size={35}/>
							</TouchableHighlight>
						</View>
						<Text style={styles.modalTitle}>Order Cart</Text>
						<Text style={styles.modalTotal}>Total Item: 1</Text>
						<View style={{width: width / 1.3}}>
							<Item stackedLabel style={styles.itemForm}>
								<Label style={styles.productCategory}>Total Price</Label>
								<Input value={this.state.totalPrice} onChangeText={(totalPrice) => this.setState({totalPrice})} keyboardType='numeric'/>
							</Item>
						</View>
						<View>
							<FlatList
								showsVerticalScrollIndicator={false}
								data={this.state.cartProducts}
								style={styles.container}
								keyExtractor={this.key}
								renderItem={this.renderItemCart} />
						</View>
					</View>
        </Modal>
				<Header style={styles.header}>
					<Left style={{ flexDirection: 'row' }}>
						<Button transparent onPress={() => this.handleBackButton()}>
							<Icon name="ios-arrow-back" size={25} color="#000000" />
							<Text style={{ fontSize: 18, color: '#000000' }}>Back</Text>
						</Button>
					</Left>
					<Body>
						<Text style={styles.title}>CUSTOMER PROFILE</Text>
					</Body>
					<Right />
				</Header>
				<Content style={styles.content} showsVerticalScrollIndicator={false}>
					<View style={styles.customerHeader}>
						<LinearGradient
							start={{ x: 0.0, y: 0.25 }}
							end={{ x: 1.5, y: 1 }}
							locations={[0, 0.5, 0.6]}
							colors={['#20E6CD', '#2D38F9', '#2D38F9']}
							style={styles.linearGradient}>
							<View style={styles.headerDirectionTitle}>
								<View>
									<TouchableHighlight underlayColor={'transparent'}>
										<H3 style={styles.headerDirectionTitle}>{params.name}</H3>
									</TouchableHighlight>
									<View style={styles.headerDirection}>
										<Icon name="md-pin" size={15} color={"#fff"}/>
										<Text style={styles.dataAddress}>{params.address}</Text>
									</View>
									<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', paddingTop: 15, paddingLeft: 20 }}>PIC List:</Text>
									<FlatList 
										data={this.props.picsCustomers}
										keyExtractor={this.key}
										renderItem={this.renderItemsPic} />
								</View>
							</View>
						</LinearGradient>
					</View>
					<View style={styles.customerTotal}>
						<Grid style={{ display: 'flex', alignItems: 'center' }}>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'active' })}>
									<H1 style={styles.totalText}>
										{JSON.stringify(
											this.props.pipelinesWithIdCustomer.filter(p => p.step !== 7).length
										)}
									</H1>
									<Text style={styles.totalText}>ACTIVE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'close' })}>
									<H1 style={styles.totalText}>
									{JSON.stringify(
										this.props.pipelinesWithIdCustomer.filter(p => p.step === 7 && p.lose === false).length
									)}
									</H1>
									<Text style={styles.totalText}>CLOSE</Text>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity
									onPress={() => this.setState({ pipelineTabs: 'lose' })}>
									<H1 style={styles.totalText}>
									{JSON.stringify(
										this.props.pipelinesWithIdCustomer.filter(p => p.lose === true).length
									)}
									</H1>
									<Text style={styles.totalText}>LOSE</Text>
								</TouchableOpacity>
							</Col>
						</Grid>
					</View>
					{this.renderPipelineTabs()}
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	pipelinesWithIdCustomer: state.pipelinesWithIdCustomer,
	sessionPersistance: state.sessionPersistance,
	picsCustomers: state.picsCustomers
})

const mapDispatchToProps = dispatch => ({
	fetchPipelinesWithIdCustomer: (id_customer, accessToken) => dispatch(fetchPipelinesWithIdCustomer(id_customer, accessToken)),
	setNavigate: (link, data) => dispatch(setNavigate(link, data)),
	fetchPicsWithIDCustomer: (id_customer, accessToken) => dispatch(fetchPicsWithIDCustomer(id_customer, accessToken))
})

const styles = StyleSheet.create({
	productCategoryView: {
		marginLeft: 15,
		marginTop: 30
	},
	picker: {
		marginLeft: -15
	},
	card: {
		display: 'flex',
		width: width / 1.2,
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#000000'
	},
	cardImage: {
		opacity: 0.5
	},
	header: {
		height: 70
	},
	title: {
		fontWeight: 'bold'
	},
	content: {
		paddingRight: 40,
		paddingLeft: 40,
		paddingBottom: 40,
		paddingTop: 20
	},
	footerWrap: {
		height: 70
	},
	footerText: {
		fontSize: 10,
		marginTop: 5
	},
	newsWrapper: {
		width: '100%',
		height: height / 8,
		backgroundColor: '#2d3ad2',
		paddingLeft: 40,
		paddingRight: 40,
		marginBottom: 20,
		display: 'flex',
		justifyContent: 'center'
	},
	picDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 3
	},
	newsTitle: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 14
	},
	closeIcon: {
		textAlign: 'right'
	},
	newsText: {
		fontSize: 12,
		color: '#ffffff',
		textAlign: 'left',
		marginBottom: 10
	},
	readMore: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'right'
	},
	newsDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10
	},
	customerHeader: {
		backgroundColor: '#ffffff',
		width: '100%',
		height: 'auto',
		justifyContent: 'center'
	},
	headerDirection: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 20,
		marginTop: 10
	},
	headerDirectionTitle: {
		display: 'flex',
		flexDirection: 'row',
		marginLeft: 20,
		color: '#fff',
		fontWeight: 'bold'
	},
	customerTotal: {
		width: '100%',
		height: height / 10,
		backgroundColor: '#4a4a4a',
		display: 'flex',
		flexDirection: 'row'
	},
	totalText: {
		textAlign: 'center',
		color: '#ffffff',
		margin: 3,
		fontSize: 14
	},
	customerPipeline: {
		width: '100%',
		minHeight: height / 5,
		height: 'auto',
		backgroundColor: '#ffffff',
		marginBottom: '2%',
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10
	},
	addPipeline: {
		marginTop: '1%',
		marginBottom: '1%',
		display: 'flex'
	},
	addPipelineText: {
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 10
	},
	addPipelineDirection: {
		flexDirection: 'row',
		backgroundColor: '#2D38F9',
		height: 60
	},
	lastVisited: {
		textAlign: 'right',
		fontSize: 10
	},
	data: {
		fontSize: 14,
		color: '#181818',
		marginLeft: 5
	},
	dataPic: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5
	},
	dataAddress: {
		fontSize: 14,
		color: '#fff',
		marginLeft: 5,
		maxWidth: width / 1.5
	},
	dataAddPic: {
		fontSize: 12,
		color: '#2D38F9',
		marginLeft: 5
	},
	titleFlex: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	iconFlex: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end'
	},
	modal: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	modalWrapper: {
		width: width / 1.2,
		height: height / 3,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalWrapperAddPipeline: {
		width: width / 1.1,
		height: height / 1.9,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		display: 'flex'
	},
	pipelineModalText: {
		marginTop: 20,
		fontSize: 18
	},
	imageModal: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
		flexDirection: 'column'
	},
	modalCancelButton: {
		fontSize: 16
	},
	modalYesButton: {
		fontSize: 16,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	pipelineContent: {
		flex: 1
	},
	leftPipeline: {
		padding: 30
	},
	formDirection: {
		flex: 1,
		paddingHorizontal: 30
	},
	formPicDirection: {
		flex: 1,
		paddingHorizontal: 30
	},
	pipelineBadgeNew: {
		backgroundColor: '#20E6CD',
		marginLeft: 15
	},
	pipelineBadgeProduct: {
		backgroundColor: '#20E6CD',
		marginLeft: 15
	},
	pipelineTitleDirection: {
		flexDirection: 'row'
	},
	titleFlex: {
		flex: 0.8
	},
	badgeFlex: {
		flex: 0.2
	},
	rowDirection: {
		display: 'flex',
		flexDirection: 'row'
	},
	picAddress: {
		borderRadius: 0,
		height: 50
	},
	step: {
		fontSize: 35,
		fontWeight: '900',
		color: '#20E6CD',
		fontStyle: 'italic', 
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	titleModal: {
		fontSize: 35,
		fontWeight: '900',
		color: '#ffffff',
		fontStyle: 'italic',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	cartContent: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
		margin: 0,
		alignItems: 'center',
		overflow:'hidden'
	},
	modalTitle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	modalTotal: {
		fontSize: 22,
		marginTop: 5
	},
	container: {
		flex: 1,
		marginTop: 20,
		marginBottom: 40
	},
	itemCart: {
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
		height: Dimensions.get('window').width / 4,
		width: width / 1.3
	},
	itemText: {
		color: '#fff',
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	cardFooterCart: {
		position: 'absolute',
		bottom: 0,
		height: '25%',
		backgroundColor: 'transparent'
	},
	cardButtonCart: {
		backgroundColor: '#ff6961',
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		borderRadius: 0
	},
	itemForm: {
		marginTop: 20,
		marginLeft: 0,
		marginBottom: 20
	},
	productCategory: {
		fontSize: 18,
		color: '#696969'
	},
	linearGradient: {
		width: '100%',
		height: 'auto',
		paddingVertical: 20,
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile)
