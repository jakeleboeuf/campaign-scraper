"use strict";

var getCampaign = function(url){
  $.getJSON( "http://scrape.jklb.co/" + url, function( data ) {
    var items = [];
    var projectContainer = $("#project");
    var perksContainer = $("#perks");
    $.each( data, function( key, value ) {
      if(key === 'project'){
        $("#project").append('<ul></ul>').find('ul');
        $.each( value, function( key, val ) {
          projectContainer.append( "<li id='" + key + "'>"+ key + ': ' + val + "</li>" );
        });
      };
      if(key === 'perks'){
        $.each( value, function( key, val ) {
          $('#perks').append('<ul></ul>').find('ul')
          $.each( val, function( key, perk ) {
            perksContainer.append( "<li id='" + key + "'>"+ key + ': ' + perk + "</li>" );
          });
        });
      };
    });
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
    $('#project h3').html('Project Details');
    $('#perks h3').html('Perks');
  });
};
