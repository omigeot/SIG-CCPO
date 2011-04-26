<?php
class DB extends DBpg {
var $db_host    = "localhost";
var $db_user    = "postgres";
var $db_passwd  = "postgres";
var $db_name    = "meaux";
}
$projection="310024149";
$maj="2010";//annee mise a jour cadastre
$config_serveur_smtp="127.0.0.1" ;
$adresse_admin="sig@meaux.fr";
$config_mail_sujet="- Probleme interface -" ;
$config_mail_contenu=" a rencontre un probleme avec l'interface cartographique.
		Merci de consulter la base d'administration
		
		-------------------------------------------------------------------------------------------------------
		Ceci est un message automatique." ;
$http_proxy_url='126.0.15.74:3128';
$http_proxy_user="utilsig";
$http_proxy_password="Spg#7";
?>
