/**
 * jquery.tweekdump.js
 * @author Bo Borgerson, based on jquery.dump.js by Torkild Dyvik Olsen
 * @version 0.1
 * 
 * A simple debug function to gather information about an object.
 * Returns a nested tree with information.
 * 
 */
(function($) {

$.fn.dump = function() {
   return $.dump(this);
}

$.dump = function(object) {
   var recursion = function(obj, level) {
      if(!level) level = 0;
      var dump = '', p = '';
      for(i = 0; i < level; i++) p += "\t";
      
      t = type(obj);
      switch(t) {
         case "string":
            return '"' + obj + '"';
            break;
         case "number":
            return obj.toString();
            break;
         case "boolean":
            return obj ? 'true' : 'false';
         case "date":
            return "Date: " + obj.toLocaleString();
         case "array":
            dump += '[\n';
            $.each(obj, function(k,v) {
               dump += p +'\t' + k + ' => ' + recursion(v, level + 1) + '\n';
            });
            dump += p + ']';
            break;
         case "object":
            dump += '{ \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ': ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         default:
            dump += 'N/A: ' + t;
            break;
      }
      
      return dump;
   }
   
   var type = function(obj) {
      var type = typeof(obj);
      
      if(type != "object") {
         return type;
      }
      
      switch(obj) {
         case null:
            return 'null';
         case window:
            return 'window';
         case document:
            return 'document';
         case window.event:
            return 'event';
         default:
            break;
      }
      
      if(obj.jquery) {
         return 'jquery';
      }
      
      switch(obj.constructor) {
         case Array:
            return 'array';
         case Boolean:
            return 'boolean';
         case Date:
            return 'date';
         case Object:
            return 'object';
         case RegExp:
            return 'regexp';
         case ReferenceError:
         case Error:
            return 'error';
         case null:
         default:
            break;
      }
      
      switch(obj.nodeType) {
         case 1:
            return 'domelement';
         case 3:
            return 'string';
         case null:
         default:
            break;
      }
      
      return 'Unknown';
   }
   
   return recursion(object);
}

function trim(str) {
   return ltrim(rtrim(str));
}

function ltrim(str) {
   return str.replace(new RegExp("^[\\s]+", "g"), "");
}

function rtrim(str) {
   return str.replace(new RegExp("[\\s]+$", "g"), "");
}

})(jQuery);
