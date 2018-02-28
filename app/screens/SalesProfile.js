import React, { Component } from 'react'
import {
	Dimensions,
	Image,
	ListView,
	PixelRatio,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native'
import {
	Tab,
	Tabs,
	Content,
	Form,
	Item,
	Label,
	H2,
	Input,
	Badge,
	Grid,
	Col
} from 'native-base'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Icon, { Button } from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { setNavigate } from '../actions/processor'
import defaultLoading from '../assets/images/default-loading.gif'
import ImagePicker from 'react-native-image-picker'
import defaultAvatar from '../assets/images/default-avatar.png'

const { width, height } = Dimensions.get('window')

class SalesProfile extends Component {

	renderBackground() {
		return (
			<View key="background">
				<Image source={{uri: 'https://images.pexels.com/photos/567633/pexels-photo-567633.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb', width: window.width, height: PARALLAX_HEADER_HEIGHT}} />
				<View style={{position: 'absolute', top: 0, width: window.width, backgroundColor: 'rgba(42,92,240,.4)', height: PARALLAX_HEADER_HEIGHT}} />
			</View>
		)
	}

	handleBackButton() {
		this.props.setNavigate()
		this.props.navigation.goBack()
	}

	renderFixedHeader = () => {
		const { navigate } = this.props.navigation
		return (
			<Grid>
				<Col style={styles.fixHeaderLeft}>
					<View key="fixed-header" style={styles.fixedSection}>
						<TouchableOpacity onPress={() => this.handleBackButton()} style={styles.fixedSectionBack}>
							<Icon
								name="ios-arrow-back"
								size={25}
								color="#fff"
								style={styles.iconBack} />
							<Text style={styles.back}>Back</Text>
						</TouchableOpacity>
					</View>
				</Col>
				<Col style={styles.fixHeaderRight}></Col>
			</Grid>
		)
	}

	render() {
		const { onScroll = () => {} } = this.props
		const { params } = this.props.navigation.state
		return (
			<ParallaxScrollView
				onScroll={onScroll}
				stickyHeaderHeight={STICKY_HEADER_HEIGHT}
				parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
				backgroundSpeed={10}
				renderBackground={this.renderBackground}
				renderForeground={() => (
					<View key="parallax-header" style={styles.parallaxHeader}>
					  <Image style={[styles.avatar, {width: AVATAR_SIZE, height: AVATAR_SIZE}]} source={params.avatar} />
						<Text style={styles.sectionSpeakerText}>{`${params.first_name} ${params.last_name}`}</Text>
					</View>
				)}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}>
						<Text style={styles.stickySectionText}>{`${params.first_name} ${params.last_name}`}</Text>
					</View>
				)}
				renderFixedHeader={this.renderFixedHeader}>
				<View style={styles.profileInfoView}>
					<H2 style={styles.profileInfoTitle}>PROFILE INFO</H2>
					<Form>
						<Item stackedLabel disabled>
							<Label style={styles.labelText}>First Name</Label>
							<Input disabled placeholder={params.first_name} />
						</Item>
						<Item stackedLabel disabled>
							<Label style={styles.labelText}>Last Name</Label>
							<Input disabled placeholder={params.last_name} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Username</Label>
							<Input disabled placeholder={params.username} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Gender</Label>
							{params.gender === 1 ? (
								<Input disabled placeholder='Male' />
							) : (
								<Input disabled placeholder='Female' />
							)}
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Email</Label>
							<Input disabled placeholder={params.email} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Branch</Label>
							<Input disabled placeholder={params.branches[0].branch} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Address</Label>
							<Input disabled placeholder={params.address} />
						</Item>
						<Item stackedLabel disabled style={styles.itemForm}>
							<Label style={styles.labelText}>Phone Number</Label>
							<Input disabled placeholder={params.phone} />
						</Item>
					</Form>
				</View>
			</ParallaxScrollView>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setNavigate: (link, data) => dispatch(setNavigate(link, data))
})

const window = Dimensions.get('window')

const AVATAR_SIZE = 100
const ROW_HEIGHT = 60
const PARALLAX_HEADER_HEIGHT = 350
const STICKY_HEADER_HEIGHT = 70

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT,
		backgroundColor: '#2A5CF0'
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2A5CF0'
	},
	stickySectionText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 22
	},
	fixedSection: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 10,
		right: 0
	},
	fixedSectionBack: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		right: 0
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 20
	},
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 100
	},
	avatar: {
		marginBottom: 10,
		borderRadius: AVATAR_SIZE / 2
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 14,
		paddingVertical: 5
	},
	fixHeaderLeft: {
		flex: 0.9
	},
	fixHeaderRight: {
		flex: 0.1
	},
	row: {
		overflow: 'hidden',
		paddingHorizontal: 10,
		height: ROW_HEIGHT,
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderBottomWidth: 1,
		justifyContent: 'center'
	},
	rowText: {
		fontSize: 20
	},
	iconBell: {
		marginRight: 10
	},
	iconSetting: {
		marginRight: 20
	},
	iconBack: {
		marginLeft: 20
	},
	back: {
		fontSize: 20,
		color: '#ffffff',
		marginLeft: 10
	},
	chartsDirection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	profileInfoView: {
		paddingHorizontal: width / 12,
		paddingVertical: height / 30
	},
	labelText: {
		fontWeight: 'bold',
		color: '#000000'
	},
	itemForm: {
		marginTop: 10
	},
	profileInfoTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 20
	},
	changeAvatarBadge: {
		backgroundColor: '#20E6CD'
	},
	viewBadge: {
		display: 'flex',
		position: 'absolute',
		top: 180,
		right: 340
	},
	changeCover: {
		display: 'flex'
	},
	changeCoverText: {
		color: '#ffffff',
		fontSize: 14,
		marginHorizontal: 5
	}
})

export default connect(null, mapDispatchToProps)(SalesProfile)
