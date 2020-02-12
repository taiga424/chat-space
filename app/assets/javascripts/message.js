$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chatMessage__messageBox" data-message-id=${message.id}>
          <div class="chatMessage__messageBox__info">
            <div class="chatMessage__messageBox__info__user">
              ${message.user_name}
            </div>
            <div class="chatMessage__messageBox__info__datetime">
              ${message.created_at}
            </div>
          </div>
          <p class="chatMessage__messageBox__text">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="chatMessage__messageBox" data-message-id=${message.id}>
          <div class="chatMessage__messageBox__info">
            <div class="chatMessage__messageBox__info__user">
              ${message.user_name}
            </div>
            <div class="chatMessage__messageBox__info__datetime">
              ${message.created_at}
            </div>
          </div>
          <p class="chatMessage__messageBox__text">
            ${message.content}
          </p>
        </div>`
      return html;
    }
  };
  
  $('#new_message').on('submit', function(e){
    console.log("check")
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatMessage').append(html);
      $('.chatMessage').animate({ scrollTop: $('.chatMessage')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.chatMessage__messageBox:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chatMessage').append(insertHTML);
        $('.chatMessage').animate({ scrollTop: $('.chatMessage')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});