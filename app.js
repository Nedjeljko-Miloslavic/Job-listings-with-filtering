//VARIABLES ---------------------------------
var body = document.querySelector("body");





//AJAX--------------------------

var xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function(){
	if(this.readyState==4 && this.status==200){
		var json = JSON.parse(this.responseText);
		json.forEach(card=>{
			create_element(card);
		});
		make_listing();
	}
}

xhttp.open("GET", "data.json", true);
xhttp.send();



//FUNCTIONS--------------------------------
function create_element(card){
	var flex_container = document.createElement("div");
	flex_container.classList.add("flex_container");
	
	var border_left = document.createElement("div");
	border_left.classList.add("border_left");
	var border_left_2 = document.createElement("div");
	border_left_2.classList.add("border_left_2");
	flex_container.appendChild(border_left);
	flex_container.appendChild(border_left_2);
	
	var surround = document.createElement("div");
	surround.classList.add("surround");
	
	var logo = document.createElement("img");
	logo.classList.add("logo");
	logo.setAttribute("src", card.logo);
	surround.appendChild(logo);
	
	var main_container = document.createElement("div");
	main_container.classList.add("main_container");
	var first_row = document.createElement("div");
	first_row.classList.add("first_row");
	var company = document.createElement("span");
	company.classList.add("company");
	company.innerHTML = card.company;
	first_row.appendChild(company);
	var new_ = document.createElement("div");
	if(card.new){
		new_.classList.add("new_");
		new_.innerHTML = "NEW!";
		first_row.appendChild(new_);
	}
	var featured = document.createElement("div");
	if(card.featured){
		featured.classList.add("featured");
		featured.innerHTML = "FEATURED";
		first_row.appendChild(featured);
	}
	main_container.appendChild(first_row);
	
	var second_row = document.createElement("div");
	second_row.classList.add("second_row");
	second_row.innerHTML = card.position;
	main_container.appendChild(second_row);
	
	var third_row = document.createElement("div");
	third_row.classList.add("third_row");
	var postedAt = document.createElement("span");
	postedAt.innerHTML = card.postedAt;
	postedAt.classList.add("postedAt");
	third_row.appendChild(postedAt);
	var contract = document.createElement("span");
	contract.innerHTML = card.contract;
	contract.classList.add("contract");
	third_row.appendChild(contract);
	var location = document.createElement("span");
	location.innerHTML = card.location;
	location.classList.add("location");
	third_row.appendChild(location);
	main_container.appendChild(third_row);
	surround.appendChild(main_container);
	
	var languages_container = document.createElement("div");
	languages_container.classList.add("languages_container");
	var role = document.createElement("span");
	role.classList.add("lang");
	role.innerHTML = card.role;
	languages_container.appendChild(role);
	var level = document.createElement("span");
	level.classList.add("lang");
	level.innerHTML = card.level;
	languages_container.appendChild(level);
	card.languages.forEach(language=>{
		var lang = document.createElement("span");
		lang.innerHTML = language;
		lang.classList.add("lang");
		languages_container.appendChild(lang);
	});
	card.tools.forEach(language=>{
		var lang = document.createElement("span");
		lang.innerHTML = language;
		lang.classList.add("lang");
		languages_container.appendChild(lang);
	});
	surround.appendChild(languages_container);
	flex_container.appendChild(surround);
	body.appendChild(flex_container);
}



function make_listing(){
	let lang_array = document.querySelectorAll(".lang");
	lang_array.forEach(lang=>{
		lang.addEventListener("click", ()=>{
			document.querySelector("#filter_list").style.visibility = "visible";
			var filter_list = document.querySelector("#filter_list #first");
			var filter = document.createElement("div");
			filter.classList.add("filter");
			var filter_span = document.createElement("span");
			filter_span.classList.add("lang");
			filter_span.innerHTML = lang.innerHTML;
			filter.appendChild(filter_span);
			var x = document.createElement("span");
			x.classList.add("x");
			x.innerHTML = "X";
			filter.appendChild(x);
			if(check_list(filter_span)){
				filter_list.appendChild(filter);
				add_remove_event(x);
				control_visibility();
			}
		});
	});
}


function check_list(filter_span){
	let filter_list = document.querySelectorAll("#first .lang");
	let filter_array = [];
	filter_list.forEach(filter=>{
		filter_array.push(filter.innerHTML);
	});
	if(filter_array.indexOf(filter_span.innerHTML)==-1){
		return true;
	}else{
		return false;
	}
}

function add_remove_event(x){
	x.addEventListener("click", (event)=>{
		let filter_list = document.querySelector("#first");
		filter_list.removeChild(event.target.parentNode);
		control_visibility();
	});
	
}


//CLEAR
document.querySelector("#second").addEventListener("click", ()=>{
	document.querySelector("#first").innerHTML = "";
	control_visibility();
	document.querySelector("#filter_list").style.visibility = "hidden";
});


//controlling visibility------------------
function control_visibility(){
	let filter_list = document.querySelectorAll("#first .lang");
	let filter_array = [];
	filter_list.forEach(filter=>{
		filter_array.push(filter.innerHTML);
	});
	let flex_container_array = document.querySelectorAll(".flex_container");
	flex_container_array.forEach(flex_container=>{
		let languages_container = flex_container.childNodes[2].childNodes[2].childNodes;
		let languages_array = [];
		languages_container.forEach(language=>{
			languages_array.push(language.innerHTML);
		});
		if(check_condition(languages_array,filter_array)){
			flex_container.style.display = "flex";
		}else{
			flex_container.style.display = "none";
		}
		
	});
}

function check_condition(languages_array, filter_array){
	for(let i=0; i<filter_array.length; i++){
		if(!languages_array.includes(filter_array[i])){
			return false;
		}
	}
	return true;
}



document.querySelector("header").addEventListener("click",()=>{
	
});
