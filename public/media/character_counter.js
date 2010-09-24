$(document).ready(function()
{
  //set max length
  var max_length = 1400;

  //load in max characters when page loads
  $("#counter").html(max_length);

  //run listen key press
  whenkeydown(max_length);
});

whenkeydown = function(max_length)
{
  $("#id_img_content").unbind().keyup(function()
  {
    //check if the appropriate text area is being typed into
    if(document.activeElement.id === "id_img_content")
    {
      //get the data in the field
      var text = $(this).val();

      //set number of characters
      var numofchars = text.length;

      //set the chars left
      var chars_left = max_length - numofchars;

      //check if we are still within our maximum number of characters or not
      if(numofchars <= max_length)
      {
        //set the length of the text into the counter span
        $("#counter").html("").html(chars_left).css("color", "#000000");
      }
      else
      {
        //style numbers in red
        $("#counter").html("").html(chars_left).css("color", "#FF0000");
      }
    }
  });
}
