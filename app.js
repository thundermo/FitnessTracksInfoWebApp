const webPageLanguage = document.getElementById('language').className;
console.log('language: '+webPageLanguage);

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

function herfGoogleMap(location){
    let googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(googleMapsLink, "_blank");
};

//read data.json
const request = new XMLHttpRequest();
request.open('GET', 'data.json', false); 
request.send(null);

if (request.status === 200) {
  var tracksData = JSON.parse(request.responseText);
  console.log(tracksData);
} else {
  console.error('Error:', request.status);
}

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

    let pTrackTitle = document.createElement('p');    
    pTrackTitle.setAttribute('herf', '#track' + trackListIndex);
    pTrackTitle.addEventListener('click', function(){
        showDetail('trackDetail'+trackListIndex);
        if  (document.getElementById('showDetailArrow' + trackListIndex).innerHTML == '˅ '){
        document.getElementById('showDetailArrow' + trackListIndex).innerHTML = '˄ ';
        document.getElementById('track' + trackListIndex).scrollIntoView({ behavior: 'smooth' });
        }else{
            document.getElementById('showDetailArrow' + trackListIndex).innerHTML = '˅ ';
        };
    });

    let btnGoogleMapURL = document.createElement('button');
    btnGoogleMapURL.setAttribute('class', 'text-like-btn');
    btnGoogleMapURL.setAttribute('style', 'color:blue; text-decoration: underline; font-size: 100%');

    let bTrackTitle = document.createElement('b');
    let pTrackDistrict = document.createElement('p');
    pTrackDistrict.setAttribute('style','font-weight: bold; font-size: 110%')
    let pHowToAccess = document.createElement('p');
    let trackTitle;
    let mapImg = document.createElement('img');
    mapImg.style.width = '100%';
    let trackPhoto = document.createElement('img');
    trackPhoto.style.width = '100%';
    trackPhoto.src = track.Image;
    //change content base on the language selected
    if (webPageLanguage == 'en'){
        pTrackDistrict.innerHTML = track.District_en;
        pHowToAccess.innerHTML = track.HowToAccess_en;
        trackTitle = document.createTextNode(track.Title_en);
        mapImg.src = track.MapURL_en;
        btnGoogleMapURL.addEventListener('click', function(){
            herfGoogleMap(track.Title_en);
        });
        btnGoogleMapURL.innerHTML = "google map"
        btnGoogleMapURL.addEventListener('click', function(){
            herfGoogleMap(track.Title_en);
        });
    }else if (webPageLanguage == 'tc'){
        pTrackDistrict.innerHTML = track.District_tc;
        pHowToAccess.innerHTML = track.HowToAccess_tc;
        trackTitle = document.createTextNode(track.Title_tc);
        mapImg.src = track.MapURL_tc;        
        btnGoogleMapURL.innerHTML = "google地圖"
        btnGoogleMapURL.addEventListener('click', function(){
            herfGoogleMap(track.Title_tc);
        });
    }
    
    //append the elements to the page
    bTrackTitle.appendChild(showDetailArrow);
    bTrackTitle.appendChild(trackTitle);
    pTrackTitle.appendChild(bTrackTitle);
    trackDiv.appendChild(pTrackTitle);
    TrackDetailDiv.appendChild(trackPhoto);
    TrackDetailDiv.appendChild(pTrackDistrict);
    TrackDetailDiv.appendChild(pHowToAccess);
    TrackDetailDiv.appendChild(btnGoogleMapURL);
    TrackDetailDiv.appendChild(mapImg);  
    trackDiv.appendChild(TrackDetailDiv);
    div.appendChild(trackDiv)
    document.getElementById('trackList').appendChild(div); 
});

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

