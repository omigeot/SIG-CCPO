//variable global;
var verif_ad="";
var verif_ident="";
var fill="false";
var stroke="false";
var style;
var identifian;
var control;
var idthe;
var symbole;
var type;
var id_appthe;
var schema="";
var table="";
var appel_req="";
var countval=0;
var app;
var mod_theme;

function tjs_haut(l) {
var indice=l.selectedIndex;
if (indice<0) {
 alert("Aucune ligne n'est s�lectionn�e");
}
if (indice>0) { // Il reste une ligne au-dessus
tjs_swap(l,indice,indice-1);
}
}

function tjs_bas(l) {
var indice=l.selectedIndex;
if (indice<0) {
alert("Aucune ligne n'est s�lectionn�e");
 }
if (indice<l.options.length-1) { // Il reste une ligne en-dessous
tjs_swap(l,indice,indice+1);
 }
} 

function tjs_swap(l,i,j) {
var valeur=l.options[i].value;
var texte=l.options[i].text;
l.options[i].value=l.options[j].value;
l.options[i].text=l.options[j].text;
l.options[j].value=valeur;
l.options[j].text =texte;
l.selectedIndex=j
tjs_ordre(l.form);
} 

function tjs_ordre(f) {
//var l=f.select_legende;
var l=document.forms[0].elements[0]
var ordre="";
for(var i=0;i<l.options.length;i++) {
if (i>0) {ordre+="-";}
document.forms[0].elements[0].ordre+=l.options[i].value;
}
document.forms[0].elements[0].ordre.value=ordre;
} 

function getDataFile(myUrlString , useData) {
	//call getURL() if available
	if (window.getURL) {
		getURL(myUrlString , useData);
	}
	else
	//call XMLHttpRequest() if available
	if (window.XMLHttpRequest) {
		function XMLHttpRequestCallback() {
			if (xmlRequest.readyState == 4) {
				//useData(xmlRequest.responseText)
				useData({success:xmlRequest.status,content:xmlRequest.responseText,contentType:xmlRequest.getResponseHeader("Content-Type")})
			}
		}
		var xmlRequest = null;
		xmlRequest = new XMLHttpRequest();
		xmlRequest.open("GET",myUrlString,true);
		xmlRequest.onreadystatechange = XMLHttpRequestCallback;
		xmlRequest.send(null);
	}
	//write an error message if either method is not available
	else {
		alert("your browser/svg viewer neither supports window.getURL nor window.XMLHttpRequest!");
	}		
}




function ordre_legende()
{
var l=document.forms[0].elements[0]
var ordre="";
for(var i=0;i<l.options.length;i++) {
ordre+=l.options[i].value+"."+(i+1)+"|";
}
ordre=ordre.substr(0,ordre.length-1);
getDataFile('./interface/back_office/update_ordre_legende.php?ordre='+ordre , retour_ordre_legende)	
}
function retour_ordre_legende(r)
{
window.location.reload();
}

var detail = 50; // nombre de nuances de couleurs 
var strhex = "0123456789ABCDEF";
var i;
var is_mouse_down = false;
var is_mouse_over = false;
var r;
var g;
var b;
var type;
function dechex(n) {
 return strhex.charAt(Math.floor(n/16)) + strhex.charAt(n%16);
}
function compute_color(e)
{
position_souris(e);
//var pos_left = document.all ? document.all('couleur').offsetLeft : document.getElementById('couleur').offsetLeft;
//var pos_top = document.all ? document.all('couleur').offsetTop : document.getElementById('couleur').offsetTop;
//x = e.offsetX ? e.offsetX : (e.target ? e.clientX-e.target.x : 0);
//y = e.offsetY ? e.offsetY : (e.target ? e.clientY-e.target.y : 0);
//alert(x+" "+y)
if(window.innerWidth)
{
x1=(window.innerWidth/2)-170;
y1=(window.innerHeight/2)-100;
}
else
{
x1=(document.documentElement.clientWidth/2)-170;
y1=(document.documentElement.clientHeight/2)-100;		
}
x=parseInt(x-x1);
y=parseInt(y-y1);
//alert(window.innerHeight+" "+window.innerWidth);
// calcul de la couleur � partir des coordonn�es du clic
var part_width = document.all ? document.all.color_picker.width/6 : document.getElementById('color_picker').width/6;
var part_detail = detail/2;
var im_height = document.all ? document.all.color_picker.height : document.getElementById('color_picker').height;
var red = (x >= 0)*(x < part_width)*255
+ (x >= part_width)*(x < 2*part_width)*(2*255 - x * 255 / part_width)
+ (x >= 4*part_width)*(x < 5*part_width)*(-4*255 + x * 255 / part_width)
+ (x >= 5*part_width)*(x < 6*part_width)*255;
var blue = (x >= 2*part_width)*(x < 3*part_width)*(-2*255 + x * 255 / part_width)
+ (x >= 3*part_width)*(x < 5*part_width)*255
+ (x >= 5*part_width)*(x < 6*part_width)*(6*255 - x * 255 / part_width);
var green = (x >= 0)*(x < part_width)*(x * 255 / part_width)
+ (x >= part_width)*(x < 3*part_width)*255
+ (x >= 3*part_width)*(x < 4*part_width)*(4*255 - x * 255 / part_width);
var coef = (im_height-y)/im_height;
// composantes de la couleur choisie sur la "palette"
red = 128+(red-128)*coef;
green = 128+(green-128)*coef;
blue = 128+(blue-128)*coef;
//alert(red+","+green+","+blue)
// mise � jour de la couleur finale
changeFinalColor('#' + dechex(red) + dechex(green) + dechex(blue));
// mise � jour de la barre de droite en fonction de cette couleur
for(i = 0; i < detail; i++)
{
if ((i >= 0) && (i < part_detail))
{
var final_coef = i/part_detail ;
var final_red = dechex(255 - (255 - red) * final_coef);
var final_green = dechex(255 - (255 - green) * final_coef);
var final_blue = dechex(255 - (255 - blue) * final_coef);
}
else
{
var final_coef = 2 - i/part_detail ;
var final_red = dechex(red * final_coef);
var final_green = dechex(green * final_coef);
var final_blue = dechex(blue * final_coef);
 }
color = final_red + final_green + final_blue ;
document.all ? document.all('gs'+i).style.backgroundColor = '#'+color : document.getElementById('gs'+i).style.backgroundColor = '#'+color;

}
}
// pour afficher la couleur finale choisie
function changeFinalColor(color)
{
var reg1=new RegExp("[rgb(]","g");
if (color.match(reg1))
{
color=color.substring(4,color.length-1);
var ta=color.split(",")
color='#'+dechex(ta[0])+dechex(ta[1])+dechex(ta[2]);
}
document.getElementById("result_color").style.background=color;
r=parseInt(color.substr(1,2),16);
g=parseInt(color.substr(3,2),16);
b=parseInt(color.substr(5,2),16);
}
// "renvoyer" la couleur en cliquant sur OK
function send_color()
{
if(type!="survol")
{	
document.getElementById(type+"_r").value=r;
document.getElementById(type+"_b").value=b;
document.getElementById(type+"_g").value=g;
}
else
{
document.getElementById("sur_coul").value="rgb("+r+","+g+","+b+")";	
}
/*if (window.opener)
{
var new_color = document.forms['colpick_form'].elements['btn_choose_color'].style.backgroundColor;
exp_rgb = new RegExp("rgb","g");
if (exp_rgb.test(new_color))
{
exp_extract = new RegExp("[0-9]+","g");
var tab_rgb = new_color.match(exp_extract);
new_color = '#'+dechex(parseInt(tab_rgb[0]))+dechex(parseInt(tab_rgb[1]))+dechex(parseInt(tab_rgb[2]));
 }
window.opener.document.forms['opener_form'].elements['couleur'].value = new_color;
window.opener.document.forms['opener_form'].elements['exemple'].style.borderColor = new_color;
window.opener.document.forms['opener_form'].elements['exemple'].style.backgroundColor = new_color;
window.opener.focus();
window.close();
}*/
svgWin.affiche_div('palette');
}
 
function palette(typ)
{
type=typ;
if(type!="survol")
{
red=document.getElementById(type+"_r").value;
green=document.getElementById(type+"_g").value;
blue=document.getElementById(type+"_b").value;
}
else
{
red=255;
green=0;
blue=0;
}

for(i = 0; i < detail; i++)
{
if ((i >= 0) && (i < detail/2))
{
var final_coef = i/(detail/2) ;
var final_red = dechex(255 - (255 - red) * final_coef);
var final_green = dechex(255 - (255 - green) * final_coef);
final_blue = dechex(255 - (255 - blue) * final_coef);
}
else
{
var final_coef = 2 - i/(detail/2) ;
var final_red = dechex(red * final_coef);
var final_green = dechex(green * final_coef);
var final_blue = dechex(blue * final_coef);
 }
color = final_red + final_green + final_blue ;
document.all ? document.all('gs'+i).style.backgroundColor = '#'+color : document.getElementById('gs'+i).style.backgroundColor = '#'+color;
}
colo='#'+dechex(red)+dechex(green)+dechex(blue);
changeFinalColor(colo)
}


function affiche_gestion(rgbfill,opa,rgbstroke,widthstroke,tab_style,ident,numcontrol,idth)
{
svgWin.affiche_div('style_theme');
style=tab_style;
identifian=ident;
control=numcontrol;
idthe=idth;
var reg=new RegExp("[,]+", "g");

if(rgbstroke=='none' || rgbstroke=='')
{
document.getElementById('stroke').checked=true;	
svgWin.affiche_div('cache_stroke');	
}
else
{

var coul_stroke=rgbstroke.split(reg);	

document.getElementById('stroke_r').value=coul_stroke[0];
document.getElementById("stroke_g").value=coul_stroke[1];
document.getElementById("stroke_b").value=coul_stroke[2];	
document.getElementById("stroke_lar").value=widthstroke;
}
if(rgbfill=='none' || rgbfill=='')
{
document.getElementById('fill').checked=true;	
svgWin.affiche_div('cache_fill');	
}
else
{

var coul_fill=rgbfill.split(reg);
	

document.getElementById('fill_r').value=coul_fill[0];
document.getElementById('fill_g').value=coul_fill[1];
document.getElementById('fill_b').value=coul_fill[2];	
document.getElementById('fill_opa').value=opa;
}
}

function affiche_symbole(rgbfill,opa,tab_style,size,symb,ident,numcontrol,idth)
{
document.getElementById("symbo").innerHTML=symb;	
	if(symb=="Abc")
	{
		symbole=symb;
		document.getElementById("symbo").style.fontFamily='Arial';
		document.getElementById("titre_symbo").innerHTML='Texte';
	}
	
svgWin.affiche_div('style_symbole');
style=tab_style;
identifian=ident;
control=numcontrol;
idthe=idth;
var reg=new RegExp("[,]+", "g");
var coul_fill=rgbfill.split(reg);
document.getElementById('symbo_r').value=coul_fill[0];
document.getElementById('symbo_g').value=coul_fill[1];
document.getElementById('symbo_b').value=coul_fill[2];	
document.getElementById('symbo_opa').value=opa;
document.getElementById('symbo_size').value=size;
}


function valide_style()
{
var reg=new RegExp("[.]+", "g");	
if(style=='style')
	{
		tabl='style';
		clause_style="idstyle='"+identifian+"'";
		couchesvgvisible=document.getElementById("coche"+control).value;
		/*res=svgdoc.getElementById("coche"+numero_control).getAttribute("onclick");*/
	//res=res.substr(19,res.length-1);
	var tableau=identifian.split(couchesvgvisible);
		var intitul_legende=tableau[1];
	svgWin.affect_couche(couchesvgvisible)
	/*var reg=new RegExp("[,]+", "g");
	var tableau=res.split(reg);
	couchesvgvisible=tableau[0].substr(0,tableau[0].length-1);*/
	}
	else
	{
		tabl='col_theme';
		
var tableau=identifian.split(reg);
		clause_style="idappthe='"+tableau[0]+"' and intitule_legende='"+tableau[1]+"'";
		svgWin.affect_couche(identifian);
		var intitul_legende=tableau[1];
		//couchesvgvisible=ident_style;
	}
	requete='UPDATE admin_svg.'+tabl+' SET ';
	if(document.getElementById('fill').checked!=true)
	{
		r_fill=document.getElementById('fill_r').value;
		g_fill=document.getElementById('fill_g').value;
		b_fill=document.getElementById('fill_b').value;
		opa=document.getElementById('fill_opa').value;
	requete+="fill='"+r_fill+","+g_fill+","+b_fill+"',opacity='"+opa+"',";
	fi=r_fill+","+g_fill+","+b_fill;
	}
	else
	{
		requete+="fill='none',opacity='1',";
		fi="none";
		opa=1;
	}
	if(document.getElementById('stroke').checked!=true)
	{
		r_stroke=document.getElementById('stroke_r').value;
		g_stroke=document.getElementById('stroke_g').value;
		b_stroke=document.getElementById('stroke_b').value;
		larg_stroke=document.getElementById('stroke_lar').value;
	requete+="stroke_rgb='"+r_stroke+","+g_stroke+","+b_stroke+"',stroke_width='"+larg_stroke+"',";
	st=r_stroke+","+g_stroke+","+b_stroke;
	}
	else
	{
		requete+="stroke_rgb='none',stroke_width='1',";
		st="none";
		larg_stroke=1;
	}
	requete=requete.substr(0,requete.length-1);
	requete+=" where "+clause_style;
	url="./interface/back_office/execute_sql.php?requete="+requete+"&genere=true";
	svgWin.affiche_div('style_theme');
	document.getElementById('cache_fill').style.visibility='hidden'
	document.getElementById('cache_stroke').style.visibility='hidden';
	svgWin.affiche_div('message_box');
	
	if(document.getElementById('fill').checked!=true)
	{
		couleu="rgb("+r_fill+","+g_fill+","+b_fill+")";
	}
	else if(document.getElementById('stroke').checked!=true)
	{
		couleu="rgb("+r_stroke+","+g_stroke+","+b_stroke+")";
	}
	else
	{
		couleu="rgb(0,0,0)";
	}
	if(style=='style')
	{
		
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_gestion('"+fi+"','"+opa+"','"+st+"','"+larg_stroke+"','"+style+"','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(opa*100)+");opacity:"+opa+";color:rgb("+fi+");font-family:svg;\">q</font>"	
	}
	else
	{
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_gestion('"+fi+"','"+opa+"','"+st+"','"+larg_stroke+"','"+style+"','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(opa*100)+");opacity:"+opa+";color:rgb("+fi+");font-family:svg;\">q</font>&nbsp;"+intitul_legende;
	}
	//document.getElementById('font'+control).style.color=couleu;
	//document.getElementById('font'+control).style.opacity=opa;
	//document.getElementById('font'+control).style.filtre.alpha(opacity)=(opa*100);
	//req="'"+fi+"','"+opa+"','0,0,0','"+larg_stroke+"','"+style+"','"+identifian+"','"+control+"','"+idthe+"'";
	//alert(req);
	//document.getElementById('td'+control).onclick=function () {affiche_gestion(fi,opa,st,larg_stroke,style,identifian,control,idthe);};
	getDataFile(url,retour_style);
		
	
}
function retour_style(r)
{
	svgWin.clear('control'+control);
	svgWin.extraction('control'+control);
	svgWin.affiche_div('message_box');
	
}
function appel_symbol()
{
	if(symbole!="Abc")
	{
getDataFile("./interface/back_office/symbolique.php",retour_symbol)	;
	}
}
function retour_symbol(r)
{
svgWin.affiche_div('choix_symbol');	
document.getElementById("contenu_choix_symbol").innerHTML=r.content;
}
function select_symb(data)
{
symbole=data;
document.getElementById("symbo").innerHTML=data;
svgWin.affiche_div('choix_symbol');	
}
function valide_symbole()
{

var reg=new RegExp("[.]+", "g");	
if(style=='style')
	{
		tabl='style';
		clause_style="idstyle='"+identifian+"'";
		couchesvgvisible=document.getElementById("coche"+control).value;
		var tableau=identifian.split(couchesvgvisible);
		var intitul_legende=tableau[1];
		//res=svgdoc.getElementById("coche"+numero_control).getAttribute("onclick");
	//res=res.substr(19,res.length-1);
	svgWin.affect_couche(couchesvgvisible);
	type=svgWin.test_type(couchesvgvisible);
	//var reg=new RegExp("[,]+", "g");
	//var tableau=res.split(reg);
	//couchesvgvisible=tableau[0].substr(0,tableau[0].length-1);
	}
	else
	{
	tabl='col_theme';
		
var tableau=identifian.split(reg);
		clause_style="idappthe='"+tableau[0]+"' and intitule_legende='"+tableau[1]+"'";
		svgWin.affect_couche(identifian);
		type=svgWin.test_type(identifian);
		var intitul_legende=tableau[1];
		//couchesvgvisible=ident_style;
	}
	

requete='UPDATE admin_svg.'+tabl+' SET ';	
symb_r=document.getElementById('symbo_r').value;
symb_g=document.getElementById('symbo_g').value;
symb_b=document.getElementById('symbo_b').value;
symb_opa=document.getElementById('symbo_opa').value;
symb_size=document.getElementById('symbo_size').value;
if(symbole=="Abc")
	{
		symbole="";
	}
requete+="fill='"+symb_r+","+symb_g+","+symb_b+"',opacity='"+symb_opa+"',symbole='"+symbole+"',id_symbole='"+symbole+"',font_size='"+symb_size+"'";
fi=symb_r+","+symb_g+","+symb_b;	
couleu="rgb("+fi+")";
	requete+=" where "+clause_style;
url="./interface/back_office/execute_sql.php?requete="+requete+"&genere=true";
svgWin.affiche_div('style_symbole');
	
	
	//document.getElementById('font'+control).style.color=couleu;
	//document.getElementById('font'+control).style.opacity=symbo_opa;
	if(symbole=="")
	{
		
		if(style=='style')
	{
		
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_symbole('"+fi+"','"+symb_opa+"','"+style+"','"+symb_size+"','Abc','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(symb_opa*100)+");opacity:"+symb_opa+";color:rgb("+fi+");font-family:svg;\">q</font>"	
	}
	else
	{
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_symbole('"+fi+"','"+symb_opa+"','"+style+"','"+symb_size+"','Abc','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(opa*100)+");opacity:"+opa+";color:rgb("+fi+");font-family:svg;\">q</font>&nbsp;"+intitul_legende;
	}
		
		//alert("<font id=\"font"+control+"\" style=\"zoom:1;filter:alpha(opacity="+(symb_opa*100)+");opacity:"+symb_opa+";color:rgb("+fi+");font-family:svg;\">q</font>&nbsp;"+intitul_legende);
		//document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" style=\"zoom:1;filter:alpha(opacity="+(symb_opa*100)+");opacity:"+symb_opa+";color:rgb("+fi+");font-family:svg;\">q</font>";
		//document.getElementById('td'+control).onclick=function () {affiche_symbole(fi,symb_opa,style,symb_size,'Abc',identifian,control,idthe);};
	}
	else
	{
			if(style=='style')
	{
		
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_symbole('"+fi+"','"+symb_opa+"','"+style+"','"+symb_size+"','"+symbole+"','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(symb_opa*100)+");opacity:"+symb_opa+";color:rgb("+fi+");font-family:svg;\">"+symbole+"</font>"	
	}
	else
	{
	document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" onclick=\"affiche_symbole('"+fi+"','"+symb_opa+"','"+style+"','"+symb_size+"','"+symbole+"','"+identifian+"','"+control+"','"+idthe+"')\" style=\"zoom:1;filter:alpha(opacity="+(opa*100)+");opacity:"+opa+";color:rgb("+fi+");font-family:svg;\">"+symbole+"</font>&nbsp;"+intitul_legende;
	}
		
		//document.getElementById("td"+control).innerHTML="<font id=\"font"+control+"\" style=\"zoom:1;filter:alpha(opacity="+(symb_opa*100)+");opacity:"+symb_opa+";color:rgb("+fi+");font-family:svg;\">"+symbole+"</font>&nbsp;"+intitul_legende;
		//document.getElementById('td'+control).onclick=function () {affiche_symbole(fi,symb_opa,style,symb_size,symbole,identifian,control,idthe);};
	}
	
	getDataFile(url,retour_sy);	

}



function retour_sy(data)
{
	if(type=='raster')
	{
	svgWin.clear('controlraster');
	svgWin.extraction('controlraster');	
	}
	else
	{
	svgWin.clear('control'+control);
	svgWin.extraction('control'+control);
	}
}

function proprie_couche(idtheme,idappthe,partiel,force_chargement,zoommax,zoommin,zoommax_raster,vu_initial,mouseover,clik,mouseout,raster,principal,schem,tabl)
{
	id_appthe=idappthe;
	schema=schem;
	table=tabl;
	idthe=idtheme
	var reg=new RegExp("[|]", "g");
	document.getElementById('partiel').checked=false;
	document.getElementById('vector').checked=false;
	document.getElementById('force').checked=false;
	document.getElementById('initiale').checked=false;
	document.getElementById('principal').checked=false;
	if(partiel==1)
	{
	document.getElementById('partiel').checked=true;
	}
	if(force_chargement==1)
	{
	document.getElementById('force').checked=true;
	}
	if(raster!='t')
	{
	document.getElementById('vector').checked=true;
	}
	if(vu_initial==1)
	{
	document.getElementById('initiale').checked=true;
	}
	if(principal=='t')
	{
	document.getElementById('principal').checked=true;
	}
	document.getElementById('zmin').value=zoommin;
	document.getElementById('zmax').value=zoommax;
	document.getElementById('zoomraster').value=zoommax_raster;
	document.getElementById('over').value=mouseover.replace(reg,"'");
	document.getElementById('clik').value=clik.replace(reg,"'");
	document.getElementById('out').value=mouseout.replace(reg,"'");
//init les variables
document.getElementById('click_secu').checked=false;
document.getElementById('click_objet').value="";
document.getElementById('click_serveur').value="serveur";
document.getElementById('click_url').value="";
document.getElementById('click_multi').checked=false;
document.getElementById('click_limit').value="";
document.getElementById('sur_coul').value="";
document.getElementById('sur_uniq').value="";
document.getElementById('sur_multi').value="";
	
var d=new Date();
getDataFile('./interface/back_office/propriete_theme.php?objkey=' + idtheme +'&d=' + d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds()+'&indice=propri',retourpropriete);	
svgWin.affiche_div('propriete_couche');
}
function retourpropriete(x)
{
var fragment=x.content.split("#");
verif_ad=fragment[1];
verif_ident=fragment[0];
}

function valide_propriete()
{
r_event="visible";
v_vect="true";
verif_force=0;
verif_initial=0;
verif_partiel=0;
if(document.getElementById('over').value=="" && document.getElementById('clik').value=="" && document.getElementById('out').value=="")
		{
			r_event="none";
		}
if(document.getElementById('vector').checked==true)
	{
	v_vect="false";
	}	
if(document.getElementById('partiel').checked==true)
	{
	verif_partiel=1;
	}	
if(document.getElementById('initiale').checked==true)
	{
	verif_initial=1;
	}
if(document.getElementById('force').checked==true)
	{
	verif_force=1;
	}	
var reg=new RegExp("(:)", "g");
		verif_click=document.getElementById('clik').value.replace(reg,"c(2p)");
		verif_over=document.getElementById('over').value.replace(reg,"c(2p)");
		var reg=new RegExp("[\+]", "g");
		verif_click=verif_click.replace(reg,"c(plus)");
		verif_over=verif_over.replace(reg,"c(plus)");		
var reg=new RegExp("(')", "g");	
requete="UPDATE admin_svg.appthe SET mouseover='"+verif_over.replace(reg,"''")+"',click='"+verif_click.replace(reg,"''")+"',mouseout='"+document.getElementById('out').value.replace(reg,"''")+"',pointer_events='"+r_event+"',raster='"+v_vect+"',zoommin="+document.getElementById('zmin').value+",zoommax="+document.getElementById('zmax').value+",zoommaxraster="+document.getElementById('zoomraster').value+",objprincipal='"+document.getElementById('principal').checked+"',partiel='"+verif_partiel+"',vu_initial='"+verif_initial+"',force_chargement='"+verif_force+"' where idappthe='"+id_appthe+"'";	
//alert(requete);
//getURL("./execute_sql.php?requete="+requete+"&genere=false",null);
//svgWin.affiche_div('propriete_couche');	
//svgWin.affiche_div('message_box');
getDataFile("./interface/back_office/execute_sql.php?requete="+requete+"&genere=false",test_adid);

}
function test_adid(x)
{
svgWin.affiche_div('propriete_couche');	
if((verif_ad=="" || verif_ident=="") && document.getElementById('over').value!="")
{
var d=new Date();	
getDataFile("./interface/back_office/sql.php?objkey="+table+"|"+schema+"&d="+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds(),retour_adid);	
svgWin.affiche_div('ad_id');	
}
else
{
svgWin.affiche_div('message_box');	
recharge_appli();
}
}

function retour_adid(x)
{
var fragment=x.content.split("#");	
var ecri="";
for(var i=0;i<fragment.length;i++)
{
ecri+="<option value=\""+fragment[i]+"\">"+fragment[i]+"</option>";	
}
document.getElementById("col_id").innerHTML=ecri;
document.getElementById("col_ad").innerHTML=ecri;
}

function valide_adid()
{
svgWin.affiche_div('message_box');	
requete_ad="insert into admin_svg.col_sel (idtheme,nom_as,appel) values ('"+idthe+"','ad','"+document.getElementById('col_ad').options[document.getElementById('col_ad').options.selectedIndex].value+"');";	
url1="execute_sql.php?requete="+requete_ad+"&genere=false";
getDataFile("./interface/back_office/"+url1,retour_ad);
	

}
function retour_ad(x)
{
requete_id="insert into admin_svg.col_sel (idtheme,nom_as,appel) values ('"+idthe+"','ident','"+document.getElementById('col_id').options[document.getElementById('col_id').options.selectedIndex].value+"');";	
url2="execute_sql.php?requete="+requete_id+"&genere=false";
getDataFile("./interface/back_office/"+url2,retour_id);	
}
function retour_id(x)
{
recharge_appli(x);	
}

function recharge_appli(x)
{
relecture(document.getElementById('choixappli').options[document.getElementById('choixappli').options.selectedIndex].value);	
}
function supp_couche()
{
 if (confirm("Etes-vous sur de vouloir supprimer cette couche de l'application?")) 
 { 
svgWin.affiche_div('propriete_couche');	
svgWin.affiche_div('message_box');
getDataFile("./interface/back_office/update_style.php?choix=supp&idappthe="+id_appthe,recharge_appli);	
 }
}
function traite_chaine(x)
{
var reg=new RegExp(String.fromCharCode(233), "g");
		var reg1=new RegExp(String.fromCharCode(232), "g");
		var reg2=new RegExp(String.fromCharCode(224), "g");
		var reg3=new RegExp(String.fromCharCode(231), "g");
		var reg4=new RegExp(String.fromCharCode(226), "g");
		var reg5=new RegExp(String.fromCharCode(244), "g");
		var reg6=new RegExp(String.fromCharCode(251), "g");
		var reg7=new RegExp(String.fromCharCode(238), "g");
		var reg8=new RegExp(String.fromCharCode(249), "g");
		var reg9=new RegExp(String.fromCharCode(239), "g");
		var reg10=new RegExp("\n", "g");
		chaine=x.replace(reg,"'+String.fromCharCode(233)+'");	
		chaine=chaine.replace(reg1,"'+String.fromCharCode(232)+'");
		chaine=chaine.replace(reg2,"'+String.fromCharCode(224)+'");
		chaine=chaine.replace(reg3,"'+String.fromCharCode(231)+'");
		chaine=chaine.replace(reg4,"'+String.fromCharCode(226)+'");
		chaine=chaine.replace(reg5,"'+String.fromCharCode(244)+'");
		chaine=chaine.replace(reg6,"'+String.fromCharCode(251)+'");
		chaine=chaine.replace(reg7,"'+String.fromCharCode(238+')");
		chaine=chaine.replace(reg8,"'+String.fromCharCode(249)+'");
		chaine=chaine.replace(reg9,"'+String.fromCharCode(39)+'");
		chaine=chaine.replace(reg10," $ ");
		return chaine;
}
function valide_over()
{
svgWin.affiche_div('script_over');	
//alert(traite_chaine(document.getElementById('sur_uniq').value))
if(document.getElementById('sur_coul').value!="")
{
document.getElementById('over').value="sur(evt,'"+traite_chaine(document.getElementById('sur_coul').value)+"','"+traite_chaine(document.getElementById('sur_uniq').value)+"','"+traite_chaine(document.getElementById('sur_multi').value)+"')";
document.getElementById('out').value="hors(evt)"
}

}
function valide_click()
{
svgWin.affiche_div('script_click');	
var secu="'http://";
var serv="'+serveur+'";
//alert(traite_chaine(document.getElementById('sur_uniq').value))
if(document.getElementById('click_secu').checked==true)
{
secu="'https://";
}
if(document.getElementById('click_serveur').value!="serveur")
{
serv=document.getElementById('click_serveur').value;
}
scriptclick="lien(evt,'"+document.getElementById('click_objet').value+"',"+secu+serv+document.getElementById('click_url').value+"?"+document.getElementById('click_variable').value+"=',";	
if (document.getElementById('click_multi').checked==true)
			{
			scriptclick+="'m','"+document.getElementById('click_limit').value+"')";	
			}
			else
			{
			scriptclick+="'','')";
			}																																							

document.getElementById('clik').value=scriptclick;

}
function verif_theme(x)
{
var d=new Date();
getDataFile("./interface/back_office/propriete_theme.php?objkey=" + x +"&d='" + d.getHours()+"'_'"+d.getMinutes()+"'_'"+d.getSeconds()+"'&indice=raster",retour_verif_theme);	
}
function retour_verif_theme(data)
{
    var fragment=data.content.split("#");
   schema=fragment[1].split("#");
   table=fragment[2].split("#");
    if(fragment[0]=='false')
	{
		
	 ecri="Appliquer un style ou une th&egrave;matique<br><select id=\"type_theme\" size=\"1\" ><option value=\"0\">Style par d&eacute;faut</option><option value=\"1\">th&egrave;matique</option></select>";	
	 }
    else
	{
	 ecri="Pas de th&egrave;matique possible sur un Raster<br><select id=\"type_theme\" size=\"1\" ><option value=\"0\">Style par d&eacute;faut</option></select>";	   
	}
	document.getElementById("choix_style").innerHTML=ecri;  
}
function valide_ajout_theme()
{
	if(document.getElementById("type_theme").options[document.getElementById("type_theme").options.selectedIndex].value==0)
	{
	svgWin.affiche_div('message_box');	
	app=document.getElementById("choixappli").options[document.getElementById("choixappli").options.selectedIndex].value.split("|");
	getDataFile("./interface/back_office/update_style.php?appli="+app[0]+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value,retour_id);
	
	}
	else
	{
	appel_req="select_thema";	
	var d=new Date();	
	getDataFile("./interface/back_office/sql.php?objkey="+table+"|"+schema+"&d="+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds(),retour_colonne_thema);		
	svgWin.affiche_div('crea_thematique');	
	}
}

function retour_colonne_thema(x)
{
	var fragment=x.content.split("#");	
var ecri="";
for(var i=0;i<fragment.length;i++)
{
ecri+="<option value=\""+fragment[i]+"\">"+fragment[i]+"</option>";	
}
document.getElementById("requete_champ").innerHTML=ecri;
	
}
function ajout_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value;
}
function centre_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"centroid("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+")";
}
function surface_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"area("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+")";
}
function longueur_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"length("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+")";
}
function chaine_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"substr("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+","+document.getElementById("debut").value+","+document.getElementById("longueur").value+")";
}
function x_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"x("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+")";
}
function y_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"y("+document.getElementById("requete_champ").options[document.getElementById("requete_champ").options.selectedIndex].value+")";
}
function op1_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"+";
}
function op2_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"-";
}
function op3_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"*";
}
function op4_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"/";
}
function op5_valeur()
{
	document.getElementById("requete_valeur").value=document.getElementById("requete_valeur").value+"||";
}
function valide_requete()
{

document.getElementById(appel_req).value=document.getElementById("requete_valeur").value	;
svgWin.affiche_div('requeteur');
document.getElementById("requete_valeur").value="";

}

function sousmettre_thematique()
{
	app=document.getElementById("choixappli").options[document.getElementById("choixappli").options.selectedIndex].value.split("|");
	if(document.getElementById(appel_req).value!="")
	{
if(document.getElementById("type_thema").options[document.getElementById("type_thema").options.selectedIndex].value=="0")
{
getDataFile("./interface/back_office/thematique.php?type=fixe&appel="+document.getElementById(appel_req).value+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value,retour_thematique);
}
else
{
getDataFile("./interface/back_office/thematique.php?type=fourchette&appel="+document.getElementById(appel_req).value+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value,retour_thematique);
}
	}
	else
	{
		alert("il faut s�lectionner un champ!");
	}

}
function retour_thematique(data)
{
countval=0;	
fragment=data.content.split('#');
countval=fragment.length;
var ecri="";

if(document.getElementById("type_thema").options[document.getElementById("type_thema").options.selectedIndex].value=="0")
{	
ecri+="<center><table><tr><td>Filtre</td><td>L&eacute;gende</td></tr>";
	
	for (k=0; k<fragment.length; k++)
		{
		ecri+="<tr><td><input id=\"filtre"+k+"\" type=\"text\" value=\""+fragment[k]+"\"></td><td><input id=\"legende"+k+"\" type=\"text\" value=\""+fragment[k]+"\"></td></tr>";
		}

}
else
{
ecri+="<center><table><tr><td>Mini</td><td>Maxi</td><td>L&eacute;gende</td></tr>";

fourche1=Math.round(parseFloat(fragment[1])-(fragment[1]*30/100));
ecri+="<tr><td><input id=\"mini0\" type=\"text\" value=\""+Math.round(fragment[0])+"\"></td><td><input id=\"maxi0\" type=\"text\" value=\""+fourche1+"\"></td><td><input id=\"legende0\" type=\"text\" value=\"de "+Math.round(fragment[0])+" a "+fourche1+"\"></td></tr>";
fourche2=Math.round(parseFloat(fragment[1])-(fragment[1]*15/100));
ecri+="<tr><td><input id=\"mini1\" type=\"text\" value=\""+(fourche1+0.01)+"\"></td><td><input id=\"maxi1\" type=\"text\" value=\""+fourche2+"\"></td><td><input id=\"legende1\" type=\"text\" value=\"de "+fourche1+" a "+fourche2+"\"></td></tr>";
ecri+="<tr><td><input id=\"mini2\" type=\"text\" value=\""+(fourche2+0.01)+"\"></td><td><input id=\"maxi2\" type=\"text\" value=\""+Math.round(fragment[1])+"\"></td><td><input id=\"legende2\" type=\"text\" value=\"de "+fourche2+" a "+Math.round(fragment[1])+"\"></td></tr>";
fourche4=Math.round(parseFloat(fragment[1])+parseFloat(fragment[1]*15/100));
ecri+="<tr><td><input id=\"mini3\" type=\"text\" value=\""+(Math.round(fragment[1])+0.01)+"\"></td><td><input id=\"maxi3\" type=\"text\" value=\""+fourche4+"\"></td><td><input id=\"legende3\" type=\"text\" value=\"de "+Math.round(fragment[1])+" a "+fourche4+"\"></td></tr>";
fourche5=Math.round(parseFloat(fragment[1])+parseFloat(fragment[1]*30/100));
ecri+="<tr><td><input id=\"mini4\" type=\"text\" value=\""+(fourche4+0.01)+"\"></td><td><input id=\"maxi4\" type=\"text\" value=\""+fourche5+"\"></td><td><input id=\"legende4\" type=\"text\" value=\"de "+fourche4+" a "+fourche5+"\"></td></tr>";
ecri+="<tr><td><input id=\"mini5\" type=\"text\" value=\""+(fourche5+0.01)+"\"></td><td><input id=\"maxi5\" type=\"text\" value=\""+Math.round(fragment[2])+"\"></td><td><input id=\"legende5\" type=\"text\" value=\"supp a "+fourche5+"\"></td></tr>";


}
ecri+="</center></table>";
document.getElementById("contenu_thema").innerHTML=ecri;
}
function creer_thematique()
{
svgWin.affiche_div('message_box');	
url="update_style.php?appli="+app[0]+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value+"&genere=false";
getDataFile("./interface/back_office/"+url,valide_thematique);
}
function Couleur_Alea() {
var rouge = Math.round( Math.random() * 255);
var vert = Math.round(Math.random()* 255);
var bleu = Math.round(Math.random()* 255);
return (rouge+','+vert+','+bleu)
}
function valide_thematique(x)
{
	
var idappthe=x.content;	
if(document.getElementById("type_thema").options[document.getElementById("type_thema").options.selectedIndex].value=="0")
	{
	
	var ecartcouleur=Math.floor(255/countval);
	for (k=0; k<countval; k++)
		{
		//couleur=(0+ecartcouleur*k)+",100,150";
		couleur=Couleur_Alea();
		url1="ajout_col_theme.php?type=fixe&idappthe="+idappthe+"&appli="+app[0]+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value+"&couleur="+couleur+"&colonn="+document.getElementById(appel_req).value+"&legende="+document.getElementById('legende'+k).value+"&valtexte="+document.getElementById('filtre'+k).value+"&ordre="+(k+1);
getDataFile("./interface/back_office/"+url1,null);
		
		}
	}
	else
	{
	countval=6;
	ecartcouleur=Math.floor(255/countval);
	for (k=0; k<countval; k++)
		{
		//couleur=(0+ecartcouleur*k)+",100,150";
		couleur=Couleur_Alea();
		url1="ajout_col_theme.php?type=fourchette&idappthe="+idappthe+"&appli="+app[0]+"&idtheme="+document.getElementById("ajout_theme").options[document.getElementById("ajout_theme").options.selectedIndex].value+"&couleur="+couleur+"&colonn="+document.getElementById(appel_req).value+"&legende="+document.getElementById("legende"+k).value+"&valmini="+document.getElementById("mini"+k).value+"&valmaxi="+document.getElementById("maxi"+k).value+"&ordre="+(k+1);
getDataFile("./interface/back_office/"+url1,null);

		}
	}
url="execute_sql.php?&genere=true";
getDataFile("./interface/back_office/"+url,termine_thema);
	
}
function termine_thema(data)
{
relecture(document.getElementById('choixappli').options[document.getElementById('choixappli').options.selectedIndex].value);	
}
function appel_schema()
{
	var d=new Date();	
	getDataFile("./interface/back_office/sql.php?objkey=schema&d="+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds(),retour_schema);		
}
function retour_schema(x)
{
	var fragment=x.content.split("#");	
var ecri="";
ecri+="<option value=\"\"></option>";
for(var i=0;i<fragment.length;i++)
{
ecri+="<option value=\""+fragment[i]+"\">"+fragment[i]+"</option>";	
}
document.getElementById("crea_schema").innerHTML=ecri;	
}
function appel_table()
{
	
	var d=new Date();	
	getDataFile("./interface/back_office/sql.php?objkey=table|"+document.getElementById("crea_schema").options[document.getElementById("crea_schema").options.selectedIndex].value+"&d="+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds(),retour_table);		
}
function retour_table(x)
{
schema=document.getElementById("crea_schema").options[document.getElementById("crea_schema").options.selectedIndex].value;
var fragment=x.content.split("#");	
var ecri="";
ecri+="<option value=\"\"></option>";
for(var i=0;i<fragment.length;i++)
{
ecri+="<option value=\""+fragment[i]+"\">"+fragment[i]+"</option>";	
}
document.getElementById("crea_table").innerHTML=ecri;	
}
function appel_colonne(x)
{
appel_req=x;	
	var d=new Date();	
	getDataFile("./interface/back_office/sql.php?objkey="+table+"|"+schema+"&d="+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds(),retour_colonne_thema);	
}
function creer_theme()
{

partiel=0;initial=0;force=0;ref="";libelle="";geom="";clause="";raster="";groupe="";

if(document.getElementById("crea_type").options[document.getElementById("crea_type").options.selectedIndex].value==0)
{
if (document.getElementById('crea_partiel').checked==true)
{
partiel=1;	
}
if (document.getElementById('crea_initiale').checked==true)
{
initial=1;	
}
if (document.getElementById('crea_force').checked==true)
{
force=1;	
}
ref=document.getElementById("crea_ref").value;
libelle=document.getElementById("crea_libel").value;
geom=document.getElementById("crea_geom").value;
clause=document.getElementById("crea_clause").value;
}
else if(document.getElementById("crea_type").options[document.getElementById("crea_type").options.selectedIndex].value==1)
{
	raster=svgdoc.getElementById("crea_shp").getFirstChild().getData();
	groupe=svgdoc.getElementById("crea_group").getFirstChild().getData();
}
else
{
	alert("bientot mise en place wms");
}
zoommin=document.getElementById('crea_zmin').value;
zoommax=document.getElementById("crea_zmax").value;
zoommaxr=document.getElementById("crea_zoomraster").value;

svgWin.affiche_div('crea_theme');
document.getElementById('postgis').style.visibility='hidden';document.getElementById('raster').style.visibility='hidden';document.getElementById('wms').style.visibility='hidden';
var url="ajout_theme.php?nomtheme="+document.getElementById("crea_nom").value+"&schema="+schema+"&table="+table+"&raster="+raster+"&groupe="+groupe+"&partiel="+partiel+"&initial="+initial+"&zoommin="+zoommin+"&zoommax="+zoommax+"&zoommaxr="+zoommaxr+"&ref="+ref+"&libelle="+libelle+"&geom="+geom+"&clause="+clause+"&force="+force;
getDataFile("./interface/back_office/"+url,retour_crea_theme);

}
function retour_crea_theme(data)
{
string=data.content.split("|");
idthe=string[1];
if (string[0]=='point') 
{
mod_theme='creation';
svgWin.affiche_div('choix_pt');
}
else if(string[0]=='line')
{
mod_theme='creation';
svgWin.affiche_div('choix_lg');
}
else
{
maj_theme();
}
}
function valid_pt()
{
svgWin.affiche_div('choix_pt');
	var url="ajout_style.php?idtheme="+idthe+"&mod_theme="+mod_theme+"&type=point&affecte="+document.getElementById("c_pt").options[document.getElementById("c_pt").options.selectedIndex].value;
getDataFile("./interface/back_office/"+url,maj_theme);
idthe="";
}
function valid_lg()
{
svgWin.affiche_div('choix_lg');
	var url="ajout_style.php?idtheme="+idthe+"&mod_theme="+mod_theme+"&type=line&affecte="+document.getElementById("c_pt").options[document.getElementById("c_pt").options.selectedIndex].value;
getDataFile("./interface/back_office/"+url,maj_theme);
idthe="";
}
function maj_theme()
{
getDataFile("./interface/back_office/sql.php?objkey=contenu",retour_maj_theme);
}
function retour_maj_theme(x)
{
var fragment=x.content.split("#");	
var ecri="";
ecri+="<option value=\"\"></option>";
for(var i=0;i<fragment.length;i++)
{
var valeu=fragment[i].split(".");	
ecri+="<option value=\""+valeu[1]+"\">"+valeu[0]+"</option>";	
}
document.getElementById("ajout_theme").innerHTML=ecri;
}
function type_appli()
{
if(document.getElementById("type_appli").options[document.getElementById("type_appli").options.selectedIndex].value==0)
{
document.getElementById('appli_non_carto').style.visibility='hidden';document.getElementById('appli_carto').style.visibility='visible';	
}
else
{
document.getElementById('appli_non_carto').style.visibility='visible';document.getElementById('appli_carto').style.visibility='hidden';		
}
}
function creer_appli()
{
	z_ouv=null;
	z_min=null;
	z_max=null;
	document.getElementById('appli_non_carto').style.visibility='hidden';
document.getElementById('appli_carto').style.visibility='hidden';
svgWin.affiche_div('crea_appli');	
if(document.getElementById("type_appli").options[document.getElementById("type_appli").options.selectedIndex].value==1)
	
	{var url=document.getElementById('appli_url').value;}
	else
	{
		var url="interface/carto.php";
		z_ouv=document.getElementById('appli_ouv').value;
	z_min=document.getElementById('appli_mini').value;
	z_max=document.getElementById('appli_max').value;
	}
requete="insert into admin_svg.application (libelle_appli,btn_polygo,libelle_btn_polygo,zoom_ouverture,zoom_min,zoom_max,url,type_appli) values ('"+document.getElementById('appli_nom').value+"','"+document.getElementById('url_insert').value+"','"+document.getElementById('texte_insert').value+"',"+z_ouv+","+z_min+","+z_max+",'"+url+"','"+document.getElementById("type_appli").options[document.getElementById("type_appli").options.selectedIndex].value+"')";
getDataFile("./interface/back_office/gest_appli.php?requete="+requete+"&gestion=creation",retour_appli);

}
function retour_appli(x)
{
var fragment=x.content.split("#");	
var ecri="";
for(var i=0;i<fragment.length;i++)
{
ecri+=fragment[i];	
}
document.getElementById("choixappli").innerHTML=ecri;
document.getElementById("mod_choixappli").innerHTML="<option value=\"\"></option>"+ecri;
}
function control_mod_appli(x)
{
	string=x.split("|");
	requete="select * from admin_svg.application where idapplication='"+string[0]+"'";
	getDataFile("./interface/back_office/gest_appli.php?requete="+requete+"&gestion=appel",retour_control_appli);
}
function retour_control_appli(x)
{
document.getElementById('mod_appli_url').value='';
document.getElementById('mod_appli_ouv').value='';
document.getElementById('mod_appli_mini').value='';
document.getElementById('mod_appli_max').value='';	
document.getElementById('mod_texte_insert').value='';
document.getElementById('mod_url_insert').value='';
var val_retour=x.content.split("|");
if(val_retour[1]==1)
{
document.getElementById('mod_appli_non_carto').style.visibility='visible';document.getElementById('mod_appli_carto').style.visibility='hidden';	
document.getElementById('mod_appli_url').value=val_retour[2];
}
else
{
document.getElementById('mod_appli_non_carto').style.visibility='hidden';document.getElementById('mod_appli_carto').style.visibility='visible';	
document.getElementById('mod_appli_ouv').value=val_retour[4];
document.getElementById('mod_appli_mini').value=val_retour[5];
document.getElementById('mod_appli_max').value=val_retour[6];	
document.getElementById('mod_texte_insert').value=val_retour[8];
document.getElementById('mod_url_insert').value=val_retour[7];
}
}
function mod_appli()
{
	var id=document.getElementById("mod_choixappli").options[document.getElementById("mod_choixappli").options.selectedIndex].value.split("|");
z_ouv=null;
	z_min=null;
	z_max=null;	
if(document.getElementById('mod_appli_ouv').value!='')
{
z_ouv=document.getElementById('mod_appli_ouv').value;}
if(document.getElementById('mod_appli_mini').value!='')
{
z_min=document.getElementById('mod_appli_mini').value;}
if(document.getElementById('mod_appli_max').value!='')
{
z_max=document.getElementById('mod_appli_max').value;}	

requete="UPDATE admin_svg.application SET btn_polygo='"+document.getElementById('mod_url_insert').value+"',libelle_btn_polygo='"+document.getElementById('mod_texte_insert').value+"',zoom_ouverture="+z_ouv+",zoom_min="+z_min+",zoom_max="+z_max+",url='"+document.getElementById('mod_appli_url').value+"' where idapplication='"+id[0]+"'";
getDataFile("./interface/back_office/gest_appli.php?requete="+requete+"&gestion=mod",null);
document.getElementById('mod_choixappli').selectedIndex=0
document.getElementById('mod_appli_non_carto').style.visibility='hidden';
document.getElementById('mod_appli_carto').style.visibility='hidden';
svgWin.affiche_div('mod_appli');
}
function supp_appli()
{
if (confirm("Etes-vous sur de vouloir supprimer cette application?")) 
 {
var id=document.getElementById("mod_choixappli").options[document.getElementById("mod_choixappli").options.selectedIndex].value.split("|");	
getDataFile("./interface/back_office/gest_appli.php?idappli="+id[0]+"&gestion=supp",retour_supp_appli);	
 }
}
function retour_supp_appli(x)
{
var val_retour=x.content.split("#");
if(val_retour[0]=="reboot")
{
relecture(val_retour[1]+"|0");
}
else
{
var ecri="";
for(var i=0;i<val_retour.length;i++)
{
ecri+=val_retour[i];	
}
document.getElementById("choixappli").innerHTML=ecri;
document.getElementById("mod_choixappli").innerHTML="<option value=\"\"></option>"+ecri;	
document.getElementById('mod_choixappli').selectedIndex=0
document.getElementById('mod_appli_non_carto').style.visibility='hidden';
document.getElementById('mod_appli_carto').style.visibility='hidden';
svgWin.affiche_div('mod_appli');
}
}