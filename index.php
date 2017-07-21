<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Шляпа</title>
    <link rel="stylesheet" href="./css/darkroom.css">
    <link rel="stylesheet" href="./css/page.css">
  </head>
  <body>
    <header id="header">

    </header>

    <div id="content">
      <div class="container">
        <section class="copy">

          <div class="figure-wrapper">
            <figure class="image-container target image1">
              <img src="./images/domokun-big.jpg" alt="" id="target1">

              <figcaption class="image-meta">
                <button onclick="editImage('.image1 img')">Редактировать</button>
              </figcaption>
            </figure>
          </div>
          
          <div class="figure-wrapper">
            <figure class="image-container target image2">
              <img src="./images/batcat.png" alt="" id="target2">

              <figcaption class="image-meta">
                <button onclick="editImage('.image2 img')">Редактировать</button>
              </figcaption>
            </figure>
          </div>
          
          <div class="figure-wrapper">
            <figure class="image-container target image3">
              <img src="./images/smile.jpg" alt="" id="target3">

              <figcaption class="image-meta">
                <button onclick="editImage('.image3 img')">Редактировать</button>
              </figcaption>
            </figure>
          </div>

        </section>
      </div>
    </div>

    <script src="./vendor/fabric.js"></script>
    <!-- <script src="./build/darkroom.js"></script> -->
    <script src="./js/core/darkroom.js"></script>
    <script src="./js/core/utils.js"></script>
    <script src="./js/core/ui.js"></script>
    <script src="./js/core/transformation.js"></script>
    <script src="./js/core/plugin.js"></script>
    <script src="./js/core/bootstrap.js"></script>

    <script src="./js/plugins/darkroom.history.js"></script>
    <script src="./js/plugins/darkroom.rotate.js"></script>
    <script src="./js/plugins/darkroom.crop.js"></script>
    <script src="./js/plugins/darkroom.save.js"></script>

    <script>

      function editImage(target) {
        var dkrm = new Darkroom(target, {
          // Size options
          minWidth: 100,
          minHeight: 100,
          maxWidth: 1000,
          maxHeight: 1000,
          ratio: 4 / 3,
          backgroundColor: '#000',

          // Plugins options
          plugins: {
            //save: false,
            crop: {
              quickCropKey: 67, //key "c"
              //minHeight: 50,
              //minWidth: 50,
              //ratio: 4/3
            }
          },

          // Post initialize script
          initialize: function () {
            var cropPlugin = this.plugins['crop'];
            // cropPlugin.selectZone(170, 25, 300, 300);
            cropPlugin.requireFocus();
          }
        });
      }
    </script>
  </body>
</html>
