"use strict";

var getCampaign = function(url){
  // helper functions
  // make the id look pretty
  function prettyId (str) {
    return str.replace(/^[ ]+|[ ]+$/g,'').replace(/[\W_]+/g,"-").toLowerCase();
  }

  // ajax call
  $.getJSON( "http://scrape.jklb.co/" + url, function( data ) {
    var projectContainer = $("#project");
    var perksContainer = $("#perks");
    $.each( data, function( key, value ) {
      if(key === 'project'){
        $("#project").append('<ul></ul>');
        $.each( value, function( key, val ) {
          projectContainer.find('ul').append( "<li id='" + key + "'>"+ key + ': ' + val + "</li>" );
        });
      };
      if(key === 'perks'){
        $.each( value, function( perkKey, val ) {
          $('#perks').append('<ul class="'+prettyId(val.title)+'"></ul>');
          $.each( val, function( itemKey, perk ) {
            perksContainer.find($('.'+ prettyId(val.title))).append( "<li id='" + itemKey + "'>"+ itemKey + ': ' + perk + "</li>" );
          });
        });
      };
    });

    // loading complete...
    $('#project h3').html('Project Details');
    $('#perks h3').html('Perks');
  });
};
