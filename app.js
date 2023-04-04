//const webPageLanguage = document.getElementById('language').className;
//console.log('language: '+webPageLanguage);

function initialize() {
    if (navigator.onLine) {
        retrieveTrails();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const trails = localStorage.getItem("trails");
            if (trails) {
                displayTrails(JSON.parse(trails));
            }
        }
    }
}

function displayTrails(trails) {
    window.alert("HELLO WORLD");
}

function retrieveTrails() {
	const xhr = new XMLHttpRequest();
	const url = "data.json";
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var trails = JSON.parse(xhr.response).trails;
			displayTrails(trails);
			
			const localStorage = window.localStorage;
            		if (localStorage) {
                		localStorage.setItem("trails", JSON.stringify(trails));
			}
		}
	};
	
	xhr.open("get", url);
	xhr.send();
}

function w3_open() {
    document.getElementById("Sidebar").style.display = "block";
    document.getElementById("Overlay").style.display = "block";
}
 
function w3_close() {
    document.getElementById("Sidebar").style.display = "none";
    document.getElementById("Overlay").style.display = "none";
}
function showDetail(id) {
	document.getElementById(id).style.display = (document.getElementById(id).style.display == 'none') ? "block" :"none";
}

/*
tracksData.forEach((track,trackListIndex) => {
    //create elements and set attributes
    let div = document.createElement('div');
    div.setAttribute('class' ,'w3-rest w3-container trackDiv');
    div.setAttribute('id', 'track' + trackListIndex);

    let trackDiv = document.createElement('div');
    trackDiv.setAttribute('class' ,'w3-container w3-margin-bottom w3-sand');  

    let TrackDetailDiv = document.createElement('div');
    TrackDetailDiv.setAttribute('id', 'trackDetail' + trackListIndex);
    TrackDetailDiv.setAttribute('style', "display:none;");

    let showDetailArrow = document.createElement('button');
    showDetailArrow.innerHTML = '˅ '; 
    showDetailArrow.setAttribute('id', 'showDetailArrow' + trackListIndex);
    showDetailArrow.setAttribute('class', 'text-like-btn');  

    let pTrackTile = document.createElement('p');    pTrackTile.setAttribute('herf', '#track' + trackListIndex);
    pTrackTile.addEventListener('click', function(){
        showDetail('trackDetail'+trackListIndex);
        if  (document.getElementById('showDetailArrow' + trackListIndex).innerHTML == '˅ '){
        document.getElementById('showDetailArrow' + trackListIndex).innerHTML = '˄ ';
        document.getElementById('track' + trackListIndex).scrollIntoView({ behavior: 'smooth' });
        }else{
            document.getElementById('showDetailArrow' + trackListIndex).innerHTML = '˅ ';
        };
    });

    let bTrackTitle = document.createElement('b');
    let pTrack = document.createElement('p');
    pTrack.setAttribute('style','font-weight: bold')
    let pTrackDetai = document.createElement('p');
    let trackTitle;
    let img = document.createElement('img');
    img.style.width = '100%';
    //change content base on the language selected
    if (webPageLanguage == 'en'){
        pTrack.innerHTML = track.District_en;
        pTrackDetai.innerHTML = track.HowToAccess_en;
        trackTitle = document.createTextNode(track.Title_en);
        img.src = track.MapURL_en;
    }else if (webPageLanguage == 'tc'){
        pTrack.innerHTML = track.District_tc;
        pTrackDetai.innerHTML = track.HowToAccess_tc;
        trackTitle = document.createTextNode(track.Title_tc);
        img.src = track.MapURL_tc;
    }
    //append the elements to the page
    bTrackTitle.appendChild(showDetailArrow);
    bTrackTitle.appendChild(trackTitle);
    pTrackTile.appendChild(bTrackTitle);
    trackDiv.appendChild(pTrackTile);
    TrackDetailDiv.appendChild(pTrack);
    TrackDetailDiv.appendChild(pTrackDetai);
    TrackDetailDiv.appendChild(img);  
    trackDiv.appendChild(TrackDetailDiv);
    div.appendChild(trackDiv)
    document.getElementById('trackList').appendChild(div); 
});
*/
//control the display of the track div blocks 
function selectDistrict(selectedDistrict){
    if (selectedDistrict != 'ALL'){
        tracksData.forEach((track,i) => {            
            if (track.District_en != selectedDistrict){
                document.getElementById('track'+i).setAttribute('style','display:none;');
            }else{
                document.getElementById('track'+i).setAttribute('style','display:block;');
            }
        });
    }else{
        tracksData.forEach((track,i) => {
            document.getElementById('track'+i).setAttribute('style','display:block;');
        })
    }          
}
