module.exports = {
	image_cache_control: `public, max-age=${7*24*60*60}`,
	resource_cache_time: 30*60*1000,

	external: {
		timeline_query_hash: "e769aa130647d2354c40ea6a439bfc08",
		shortcode_query_hash: "2b0673e0dc4580674a88d426fe00ea90",
		timeline_fetch_first: 12,
		username_regex: "[\\w.]+",
		shortcode_regex: "[\\w-]+"
	},

	symbols: {
		NO_MORE_PAGES: Symbol("NO_MORE_PAGES"),
		TYPE_IMAGE: Symbol("TYPE_IMAGE"),
		TYPE_VIDEO: Symbol("TYPE_VIDEO"),
		TYPE_GALLERY: Symbol("TYPE_GALLERY"),
		TYPE_GALLERY_IMAGE: Symbol("TYPE_GALLERY_IMAGE"),
		TYPE_GALLERY_VIDEO: Symbol("TYPE_GALLERY_VIDEO")
	}
}
