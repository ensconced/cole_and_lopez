window.coleandlopez = {
	yearRange: function() {
		var year = (new Date()).getFullYear();
			if (year === 2018) {
			return ""
		} else {
			return " - " + year;
		}
	}
};
