/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready', 'received');

alert("tratto il login");
        $("#loginForm").on("submit",handleLogin);

        //document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
        document.addEventListener("backbutton", this.onBackKeyDown(this), false);
        document.addEventListener("menubutton", this.onMenuKeyDown(this), false);


    },
    onMenuKeyDown: function()
    {
        alert("premuto menu button");
    },

    onBackKeyDown: function()
    {
        alert("premuto back button");
    },

    onPause: function()
    {
        this.receivedEvent('deviceready', 'pause');
    },

    onResume: function()
    {
        this.receivedEvent('deviceready', 'resume');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id, secondElement) {
        var parentElement = document.getElementById(id);
        if (parentElement)
        {
            var otherElement = parentElement.querySelector('p');
            var secElement = parentElement.querySelector('.' + secondElement);

            otherElement.setAttribute('style', 'display:none;');
            secElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id + ' ' + secondElement);
            alert(secondElement);
        }
    }
};

app.initialize();


function init() {
    document.addEventListener("deviceready", deviceReady, true);
}


function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    alert("click");
    if(u != '' && p!= '') {

    $.ajax({
      url: "http://cpatest.gruppo.autostrade.it/CPA_TST/Login",
      data: {username:u,password:p}
    })
      .done(function( data ) {
        alert("fatto");

      })
      .fail(function (data)
      {
        alert("fail " + data);
        console.dir(data);
      });


    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    alert("fine chiamata");
    return false;
}

