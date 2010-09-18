
var punch = {
  init_handle_input: function(){
    var hi = $("#handle_input")
    var orig = hi.val();
    hi.focus(function(){ if (hi.val() == orig){ hi.val("") } });
    hi.focusout(function(){ if (hi.val() == ""){ hi.val(orig) } });
  },
};
$(document).ready(function(){
  punch.init_handle_input();
});
