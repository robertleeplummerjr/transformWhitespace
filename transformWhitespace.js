function transformWhitespace(value, toWhitespace) {
	toWhitespace = toWhitespace || false;

	var el = document.createElement('span'),
		replace,
		nonBreakingSpace = String.fromCharCode(160);

	//convert string to Elements
	el.innerHTML = value;

	//setup replacement functions
	if (toWhitespace) {
		replace = function(node) {
			return node.nodeValue.replace(/[&]nbsp[;]/g, ' ');
		};
	} else {
		replace = function(node) {
			return node.nodeValue.replace(/\s/g, function(found) {
				if (found.match(/[\n\t]/)) {
					return found;
				}
				return nonBreakingSpace;
			});
		};
	}

	function replaceIn(el) {
		var children = el.childNodes,
			length = children.length,
			i = 0,
			node;

		if (length > 0) {
			for(;i < length;i++) {
				node = children[i];
				switch (node.nodeType) {
					case 1: replaceIn(node);
						break;
					case 3:
						node.nodeValue = replace(node);
				}
			}
		}
	}

	replaceIn(el);

	return el.innerHTML;
}
