/**
 * jquery.tweekdump.js
 * @author Bo Borgerson, based on jquery.dump.js by Torkild Dyvik Olsen
 * @version 0.1
 * 
 * A simple debug function to gather information about a json object.
 * Returns a string.
 * 
 */
(function($) {

  $.fn.dump = function() {
     return $.dump(this);
  }

  $.dump = function(object) {

    var dive = function(obj, level) {

      if(!level) level = 0;
      var dump = '', p = '';
      for(i = 0; i < level; i++) p += "  ";

      t = toString.call(obj).replace(/(?:^\[object |\]$)/g,'');

      switch(t) {
        case "String"  : return '"' + obj + '"';
        case "Number"  : return obj.toString();
        case "Boolean" : return obj ? 'true' : 'false';
        case "Array":
          dump += '[\n';
          $.each(obj, function(k,v) {
          dump += p +'  ' + dive(v, level + 1) +
            ((k == obj.length-1)?'\n':',\n');
          });
          dump += p + ']';
          break;
        case "Object":
          dump += '\{ \n';
          cur = 0
          last = _.keys(obj).length
          $.each(obj, function(k,v) {
          dump += p + '  ' + k + ': ' + dive(v, level + 1) + 
            ((++cur == last)?'\n':',\n');
          });
          dump += p + '\}';
          break;
        default: return '[object: ' + t +']';
      }

      return dump;
    }

    return dive(object);
  }
})(jQuery);
