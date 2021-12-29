<div id="top"></div>
<!--
* Thanks for checking out the Best-README-Template. If you have a suggestion
* that would make this better, please fork the repo and create a pull request
* or simply open an issue with the tag "enhancement".
* Don't forget to give the project a star!
* Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div>
  <h3 align="center">R o b o T r o l l</h>
  <p align="center">RoboTroll, a module that supports client requests through each component or element in the application to prevent the use of robots from excessive use of website application features without challenge–response authentication.</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#preparing-dataset">Preparing Dataset</a>
      <ul>
      </ul>
    </li>
    <li>
      <a href="#training-testing">Training and Testing</a>
      <ul>
  </li>
      </ul>
    </li>
    <li><a href="#configuration">Configuring RoboTroll</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li> <a href="#acknowledgements"> Acknowledgements</a></li>
</details>

<!-- Preparing -->
## Preparing Dataset
The first step for configuring RoboTroll inside the serverside is traning the dataset. Let's say we have dataset with the following structure:
| x1  | x2  |  x3 |  ... |  y |
|---|---|---|---|---|
|  1 |  x21 |  x31 | ...  |  y1 |
|  1 |  x22 |  x32 |  ... |  y2 |
|  ... |  ... | ...  | ...  | ...  |
|  n |  x2n |  x3n | ...  |  yn |
X variable is the difference between two request times which user/robot does. Y has two values which is 0 for human, and one for robot.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Training and Testing -->
## Training and Testing
After we have the dataset, then we give that dataset to the learning algorithm for classification. Leaning algorithm will produce theta for prediction need.

For training example see the [demo](https://github.com/larasras/RoboTroll-Demo)

To see the testing result, use a confusion matrix and calculate accuracy and F1-score. The logic is the more we have features the smarter RoboTroll will detect the robot.

Based on the training we have done in the demo, we have 100% accuracy and F1-score (using 10 features), and 94% accuracy and F1-score (using 5 features).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Configuring -->
## Configuring RoboTroll
The last step is cofiguring the RoboTroll module inside our serverside. Configuring the module is very easy because the module has flexibility. The logic is we must store the timestamp for each user do request. We can use session/database/others secure storage for storing it.

For each request user do, predict the user is a robot or not using the timestamp we stored before.

For more information, see the [demo](https://github.com/larasras/RoboTroll-Demo)
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Contact -->
## Contact
* [Ali Nurdin]([https://github.com/alinrdinn](https://github.com/alinrdinn))
* [Farra Jessica](https://github.com/FarraJessica)
* [Laras Rasdiyani]([https://github.com/larasras](https://github.com/larasras))

* Project Link: [[RoboTroll](https://github.com/larasras/RoboTroll-Demo)]
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- License -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [StackEdit](https://stackedit.io/)
* [ReadMe Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>