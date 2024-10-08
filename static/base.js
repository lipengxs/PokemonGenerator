function downloadZpl() {
    const zplText = document.getElementById('zplOutput').value;
    if (zplText==""){
        Swal.fire("Please convert to zpl before downloading !");
        return
    }
    const blob = new Blob([zplText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.zpl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyToClipboard() {
    const zplText = document.getElementById('zplOutput').value;
    if (zplText==""){
        Swal.fire("Please convert to zpl before downloading !");
        return
    }
    navigator.clipboard.writeText(zplText).then(function () {
        alert('ZPL text copied to clipboard');
    }, function (err) {
        console.error('Unable to copy text: ', err);
    });
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // 发送用户令牌到服务器进行验证
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var result=JSON.parse(xhr.responseText);
            if (result.error&&result.error!=""){
                console.error("login error :",result.error)
                return
            }
            var user = result.user;

            // 存储会话 Token
            document.cookie = "session_token=" + result.token + "; path=/";
            document.getElementById('login-button').style.display = 'none';
            var userInfo = document.getElementById('user-info');
            userInfo.innerHTML = `<img src="${user.picture}" alt="User Picture"> ${user.name}`;
        } else {
            console.error('Failed to sign in:', xhr.responseText);
        }
    };
    xhr.send('idtoken=' + response.credential);
}
//
// window.onload = function () {
//     // 检查会话 Token
//     var token = document.cookie.split('; ').find(row => row.startsWith('session_token='));
//     if (token) {
//         var tokenValue = token.split('=')[1];
//         // 使用会话 Token 验证用户
//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', '/api/validate_token');
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 var user = JSON.parse(xhr.responseText).user;
//                 document.getElementById('login-button').style.display = 'none';
//                 var userInfo = document.getElementById('user-info');
//                 userInfo.innerHTML = `<img src="${user.picture}" alt="User Picture">${user.name}`;
//             } else {
//                 console.error('Failed to validate token:', xhr.responseText);
//                 initializeGoogleAccounts();
//             }
//         };
//         xhr.send('token=' + tokenValue);
//     } else {
//         initializeGoogleAccounts();
//     }
//
// }
//
// function initializeGoogleAccounts() {
//     console.warn("initializeGoogleAccounts")
//     google.accounts.id.initialize({
//         client_id: '538946901479-08hh86f43uvd8tk2gpvo7fojmoggbkpt.apps.googleusercontent.com',
//         callback: handleCredentialResponse,
//         auto_select: true
//     });
//
//     google.accounts.id.prompt(); // 显示 One Tap 提示
// }



function toggleAnswer(faq) {
    const answer = faq.nextElementSibling;
    const icon = faq.querySelector('.icon');
    const isOpen = answer.style.display === 'block';

    answer.style.display = isOpen ? 'none' : 'block';
    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

