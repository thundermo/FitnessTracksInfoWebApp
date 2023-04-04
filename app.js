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

var tracksData;
//read data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Store the data as an object
    tracksData = data;
    console.log('inside loop:',tracksData);
    // Use the data as an object
  })
  .catch(error => console.error(error));
  console.log('outside loop:',tracksData);

/*  the append elements in html code:
    <div class="w3-third w3-container">
      <div id="'track' + trackListIndex" class="w3-container w3-margin-bottom w3-white">
        <p><b> <button>˅ </button> Ap Lei Chau Wind Tower Park </p> 
        <div id="'trackDetail'+trackListIndex" style="display:none;">
          <p>Total Track Length: 1200 m<br>Calories consumed: 50-60 Cal</p>
          <p>MTR: Lei Tung Station Exit A1<br>Bus: 90, 90B, 90C, 91, 91A, 93, 93C, 95C, 95P, 95, 99, 171, 590, 592, 595, 671<br>Public Light Bus: 27, 27A, 29, 29A, 36, 36X, 37, 37A, 63</p>
          <img src="https://www.lcsd.gov.hk/en/sportforall/common/graphics/en/walk/map_01.jpg" style="width:100%">
        </div>
      </div>
    </div>
*/
//append track list block to html
tracksData.forEach(track,trackListIndex => {  
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
 
  let pTrackTile = document.createElement('p');
  pTrackTile.setAttribute('herf', '#track' + trackListIndex);
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
  pTrack.innerHTML = Route_en;
  
  let pTrackDetai = document.createElement('p');
  pTrackDetai.innerHTML = track.HowToAccess_en;

  let img = document.createElement('img');
  img.src = track.MapURL_en;
  img.style.width = '100%';
  bTrackTitle.appendChild(showDetailArrow);
  bTrackTitle.appendChild(document.createTextNode(track.Title_en));
  pTrackTile.appendChild(bTrackTitle);
  trackDiv.appendChild(pTrackTile);
  TrackDetailDiv.appendChild(pTrack);
  TrackDetailDiv.appendChild(pTrackDetai);
  TrackDetailDiv.appendChild(img);  
  trackDiv.appendChild(TrackDetailDiv);
  div.appendChild(trackDiv)
  document.getElementById('trackList').appendChild(div); 
});

function selectDistrict(selectedDistrict){
    if(selectedDistrict != 'all'){
        tracksData.District_en.forEach(trackDistrict,i => { 
            if (trackDistrict != selectedDistrict){
                document.getElementById('track'+i).setAttribute('style','display:none;');
            }
        });
    }else{
        document.querySelectorAll('.trackDiv').forEach(div => {
            div.style.display = 'none';
        });
    }
}
