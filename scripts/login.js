// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            var user = authResult.user;

            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email
                }).then(function () {
                    console.log("New user aded to firestore");
                    window.location.assign("main.html");
                })
                    .catch(function (error) {
                        console.log("Error adding new user: " + error);
                    });
            } else {
                return true;
            }

            function writeBookmarks() {
                var bookmark = db.collection("users").doc(user.uid).collection("bookmark");

                bookmark.add({
                    code: "BBY01",
                    dateAddedID: "fav1",
                    dateAdded: "July 3, 2020",
                    name: "Monstera"
                });
                bookmark.add({
                    code: "BBY02",
                    name: "Peace Lily",
                    dateAdded: "April 14, 2021",
                    dateAddedID: "fav2"
                });
                bookmark.add({
                    code: "BBY03",
                    name: "Money Tree",
                    dateAdded: "August 10, 2021",
                    dateAddedID: "fav3"
                });
            }
            writeBookmarks();

            function writePlants() {
                var plants = db.collection("users").doc(user.uid).collection("plants");

                plants.add({
                    common_name: "Ficus Burgundy",
                    nickname: "ficus",
                    adoption: "Adopted on 2020-07-03"
                });
                plants.add({
                    common_name: "Ficus Tineke",
                    nickname: "Ruby",
                    adoption: "Adopted on 2021-08-14"
                });
                plants.add({
                    common_name: "ZZ Plant",
                    nickname: "zz",
                    adoption: "Adopted on 2021-08-10"
                });
                plants.add({
                    common_name: "Lavender",
                    nickname: "Lalala",
                    adoption: "Adopted on 2021-05-24"
                });
            }
            writePlants();

            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);