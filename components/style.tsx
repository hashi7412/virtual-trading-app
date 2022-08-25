import { Platform, StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const w = (w: number) => wp(w + '%')
export const h = (h: number) => hp(h + '%')

export const colors = {
// Light mode colors
	bg:				"#ffffff",
	bg2:			"#ffffff",

	color:			"#2a2727",
	color2:			"#6a5e5e",
	border:			"#181616",
	hr:				"#f7f1f1",

// Dark mode colors
	bgDark:			"#2f342d",

	colorDark:		"#ead8d8",
	borderDark:		"#181616",
	hrDark:			"#181616",

//Common colors
	primary:		"#4137ff",
	danger:			"#ff0000",
	success:		"#0f7b13",
	warning:		"#0f7b13",
}

export const textColor = {
	white: { color: colors.color },
	danger: { color: colors.danger },
	warning: { color: colors.warning }
}

export const gfont = StyleSheet.create({
	t1: 			{ fontSize: hp('5%') },
	t2: 			{ fontSize: hp('3%') },
	t3: 			{ fontSize: hp('2.5%') },
	t: 				{ fontSize: hp('2.2%') },
	t0: 			{ fontSize: hp('1.5%') }
})

export const border = {
	borderColor: colors.border,
	borderWidth: w(0.2),
}

export const grid = StyleSheet.create({
	gridMargin1: {
		marginBottom: h(1)
	},
	gridMargin2: {
		marginBottom: h(2)
	},
	gridMargin3: {
		marginBottom: h(3)
	},
	gridMargin4: {
		marginBottom: h(4)
	},
	colBetween: {
		alignSelf: "stretch",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	},
	rowCenter: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	rowCenterCenter: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	rowCenterAround: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},
	rowBetween: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowCenterBetween: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	rowCenterEnd: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end"
	},
	btnGroup: {
		alignSelf: "stretch",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: w(-2),
		marginRight: w(-2)
	},
	modal: {
		marginTop: h(-100),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.bg,
		width: w(100),
		minHeight: h(100),
		zIndex: 1
	},
	modalContainer: {
		alignSelf: "center",
		backgroundColor: colors.bg,
		paddingTop: h(1),
		paddingBottom: h(3),
		width: w(90),
		maxHeight: h(85)
	},
	modalContent: {
		paddingTop: h(2),
		paddingRight: w(5),
		paddingLeft: w(5),
		paddingBottom: h(2)
	},
	dropdown: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: colors.bg,
		width: w(70),
		height: h(7),
		...border,
		paddingLeft: w(5),
		paddingRight: w(5)
	}
})

export const gstyle = StyleSheet.create({
	body: {
		alignSelf: "stretch",
		backgroundColor: colors.bg
	},
	container: {
		alignSelf: "stretch",
		paddingTop: h(3),
		paddingRight: w(3),
		paddingLeft: w(3)
	},
	scrollviewContainer: {
		paddingBottom: h(23),
		paddingLeft: w(2),
		paddingRight: w(2),
	},
	subContainer: {
		paddingRight: w(5),
		paddingLeft: w(5)
	},
	title: {
		...gfont.t2,
		marginTop: h(4),
		color: colors.color,
		fontWeight: "700",
		textTransform: "uppercase",
		textAlign: "center",
		marginBottom: h(3.5)
	},
	title2: {
		...gfont.t2,
		color: colors.color,
		fontWeight: "700",
		textTransform: "uppercase",
		textAlign: "center"
	},
	label: {

		...gfont.t,
		color: colors.color,
		marginBottom: h(1)
	},
	labelWhite: {
		...gfont.t,
		...textColor.white
	},
	labelSm: {
		...gfont.t0,
		...textColor.white,
		lineHeight: h(2)
	},
	labelLg: {
		...gfont.t3,
		...textColor.white,
		lineHeight: h(2.8)
	},
	textLight: {
		...gfont.t,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	bold: {
		fontWeight: "700"
	},
	textLightCenter: {
		...gfont.t,
		...textColor.white,
		marginBottom: h(2),
		textAlign: "center"
	},
	textLightSm: {
		...gfont.t0,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	textLightLg: {
		...gfont.t3,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	textLightLgCenter: {
		...gfont.t3,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2),
		textAlign: "center"
	},
	textLightMd: {
		...gfont.t3,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	textLightMdCenter: {
		...gfont.t3,
		...textColor.white,
		lineHeight: h(2.8),
		marginBottom: h(2),
		textAlign: "center"
	},
	textLightSmCenter: {
		...gfont.t0,
		...textColor.white,
		marginBottom: h(2),
		textAlign: "center"
	},
	textLightCenterUppercase: {
		...gfont.t,
		...textColor.white,
		marginBottom: h(2),
		textAlign: "center"
	},
	textWarning: {
		...gfont.t,
		...textColor.warning,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	textDanger: {
		...gfont.t,
		...textColor.danger,
		lineHeight: h(2.8),
		marginBottom: h(2)
	},
	link: {
		...gfont.t,
		color: colors.warning,
	},
	linkCenter: {
		...gfont.t,
		color: colors.warning,
		marginBottom: h(2),
		textAlign: "center"
	},
	textCenter: {
		alignSelf: "center",
		textAlign: "center",
	},
	listItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	hr: {
		backgroundColor: colors.hr,
		height: h(0.1),
		marginTop: h(2),
		marginBottom: h(2),
		alignSelf: "center"
	},
	hr2: {
		backgroundColor: colors.hr,
		height: h(0.3),
		marginTop: h(2),
		marginBottom: h(2),
		alignSelf: "stretch"
	},
	input: {
		...gfont.t,
		alignSelf: "center",
		color: colors.color,
		...border,
		paddingTop: h(2),
		paddingBottom: h(2),
		paddingRight: w(3),
		paddingLeft: w(3),
	}
})