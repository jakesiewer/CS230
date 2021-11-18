var start = "off";
var press = false;
var run = false;
var arraymatch = true;
var sequence = [];
var playerseq = [];
var count = 0;
var level = 1;
var buttons = ["green", "red", "yellow", "blue"];

$("#midbox").on("click", function() 
{
    if (start == "off")
    {
        $("#light").css("background-color", "green");
        start = "on";
        run = "true";
        //latestScore();
    }
    else if(start == "on")
    {
        $("#light").css("background-color", "red");
        start = "off";
        //reset();

    }
});

// function reset()
// {
//     sequence = [];
//     playerseq = [];
//     count = 0;
//     level = 1;
//     arraymatch = true;
// }

// function latestScore()
// {
//     $("#rightbox").html(count);
// }

// var fill = function() 
// {
//     return arr.push(buttons[Math.floor(Math.random() * buttons.length)]);
// };

// function runSequence()
// {

// };

// function sequencePattern() 
// {
//     var offset = 0;
//     $.each(seq, function(i, clr) 
//     {
//         setTimeout(function() 
//         {
//             if (seq[i] === "green") 
//             {
//                 green();
//             } 
//             else if (seq[i] === "red") 
//             {
//                 red();
//             } 
//             else if (seq[i] === "yellow") 
//             {
//                 yellow()
//             } 
//             else if (seq[i] === "blue")
//             {
//                 blue();
//             }
//             if (i === seq.length - 1)
//             {
//                 press = true;
//                 $(".segment").css("cursor", "pointer");
//             }
//         }, 1000 + offset);
//         offset += 750;
//     });
// }

// $(".greenbutton").click(function() 
// {
//     if(press) 
//     {
//     playerseq.push("green");
//     }
// })

// $(".redbutton").click(function() 
// {
//     if(press) 
//     {
//     playerseq.push("red");
//     }
// })

// $(".yellowbutton").click(function() 
// {
//     if(press) 
//     {
//     playerseq.push("yellow");
//     }
// })

// $(".bluebutton").click(function() 
// {
//     if(press) 
//     {
//     playerseq.push("blue");
//     }
// })

// function flashgreen()
// {
//     $("#greenbutton").css("background", "rgb(41, 184, 41)")
//     setTimeout(function()
//     {
//         $("#greenbutton").css("background-image", "linear-gradient(rgba(195, 255, 200, 0.350), green)")
//     },500)
// }

// function flashred()
// {
//     $("#redbutton").css("background", "rgb(255, 115, 115);")
//     setTimeout(function()
//     {
//         $("#redbutton").css("background-image", "linear-gradient(rgb(255, 95, 95), red)")
//     },500)
// }

// function flashyellow()
// {
//     $("#yellowbutton").css("background", "rgb(245, 245, 132);")
//     setTimeout(function()
//     {
//         $("#yellowbutton").css("background-image", "linear-gradient(rgb(255, 255, 91), rgb(255, 196, 0))")
//     },500)
// }

// function flashblue()
// {
//     $("#bluebutton").css("background", "rgb(66, 66, 248)")
//     setTimeout(function()
//     {
//         $("#bluebutton").css("background-image", "linear-gradient(rgb(70, 70, 220), blue)")
//     },500)
// }

// function flashRed() 
// {
//     document.getElementById("redbutton").click();
// }
// function flashYellow() 
// {
//     document.getElementById("yellowbutton").click();
// }

// function pulse(cbfunc, delay, reps) 
// {
//     let r = 0;
//     let intervalID = window.setInterval(function () 
//     {
//         cbfunc();
//         if (++r === reps) 
//         {
//             window.clearInterval(intervalID);
//         }
//     }, delay);
// }