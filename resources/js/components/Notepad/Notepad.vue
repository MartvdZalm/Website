<template>
	<div class="notepad-container">
  <div class="title-bar">
    <img class="notepad-icon" src="https://www.file-extensions.org/imgs/app-icon/128/759/microsoft-windows-notepad-icon.png" />
    <span class="title">Notepad</span>
  </div>

  <nav class="menu-bar">
    <ul class="nav">
      <li><a href="#">File</a>
        <ul class="sub-menu">
          <li><a href="#">New</a></li>
          <li><a href="#">Open...</a></li>
          <li><a href="#">Save</a></li>
          <li><a href="#">Save As...</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a href="#">Page Setup</a></li>
          <li><a href="#">Print...</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a @click="router.push('/')">Exit</a></li>
        </ul>
      </li>
      <li><a href="#">Edit</a>
        <ul class="sub-menu">
          <li><a href="#">Undo</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a class="disabled" href="#">Cut</a></li>
          <li><a class="disabled" href="#">Copy</a></li>
          <li><a href="#">Paste</a></li>
          <li><a class="disabled" href="#">Delete</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a href="#">Find...</a></li>
          <li><a href="#">Find Next</a></li>
          <li><a href="#">Replace...</a></li>
          <li><a class="disabled" href="#">Go To...</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a href="#">Select All</a></li>
          <li><a href="#">Time/Date</a></li>
        </ul>
      </li>

      <li><a href="#">Format</a>
        <ul class="sub-menu">
          <li><a href="#">Word Wrap</a></li>
          <li><a href="#">Font...</a></li>
        </ul>
      </li>

      <li><a href="#">View</a>
        <ul class="sub-menu">
          <li><a class="disabled" href="#">Status Bar</a></li>
        </ul>
      </li>

      <li><a href="#">Help</a>
        <ul class="sub-menu">
          <li><a href="#">View Help</a></li>
          <li class="separator"><a href="#"></a></li>
          <li><a href="#">About Notepad</a></li>
        </ul>
      </li>

    </ul>
  </nav>

  <textarea>Hello World</textarea>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>

.notepad-container {
	background: #FFF;
  	width: 780px;
  	height: 575px;
  	margin: 50px auto;
  	box-sizing: border-box;
  	padding: 1px;
}

.notepad-container .notepad-icon {
  	height: 20px;
  	float: left;
  	padding: 5px 5px 0 8px;
}

.notepad-container .title-bar {
  height: 26px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-family: "Segoe UI", arial;
  font-size: 12px;
  line-height: 26px;
  vertical-align: middle;
}

.notepad-container .menu-bar {
  position: relative;
  margin-top: 5px;
  display: inline-block;
  width: 100%;
}

.notepad-container .menu-bar ul {
  padding: 0;
  margin: 0;
  font-size: 0;
}

.notepad-container .menu-bar ul li a {
  text-decoration: none;
  color: #000;
  font-size: 12px;
  text-align: center !important;
}

.notepad-container .menu-bar > ul li {
  list-style: none;
  font-family: "Segoe UI", arial;
  font-size: 13px;
  position: relative;
  padding-bottom: 2px;
}

.notepad-container textarea {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px 8px;
  border: 1px solid #0078d7;
  overflow: scroll;
  overflow-x: hidden;
  font-family: "consolas", arial;
  font-size: 12px;
  height: 523px;
  resize: none;
  position: relative;
}

.notepad-container textarea:focus {
  outline: none;
}

.notepad-container .menu-bar .sub-menu {
  display: none;
  position: absolute;
  left: 0;
  width: 180px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 1px 0 #999;
  margin-left: -1px;
  z-index: 5;
  padding: 2px;
  top: 19px;
}

.notepad-container .menu-bar .sub-menu li {
  font-size: 12px;
  width: 100%;
  padding-bottom: 0;
}

.notepad-container .menu-bar > ul li {
  display: inline-block;
}

.notepad-container .menu-bar > ul li a {
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
}

.notepad-container .menu-bar > ul li a:hover {
  background: #e5f3ff;
  outline: 1px solid #cce8ff;
}

.menu-bar > ul li:hover ul.sub-menu {
  display: block;
}

.notepad-container nav.menu-bar ul.nav li a {
  display: inline-block;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
  padding-top: 0;
}

.notepad-container nav.menu-bar .sub-menu li a {
  padding: 4px 4px 4px 30px !important;
  background: transparent !important;
  outline: none !important;
}

.notepad-container .menu-bar ul li:hover .sub-menu a {
  text-align: left !important;
}

.notepad-container .menu-bar ul li:hover .sub-menu a:hover {
  background: #91c9f7 !important;
}

.notepad-container .menu-bar .sub-menu .separator {
  height: 1px;
  padding: 0 !important;
  margin: 2px 0 2px 0;
  background: #ccc;
  font-size: 0;
}

.notepad-container .menu-bar .sub-menu .separator a {
  height: 0px !important;
  padding: 0 !important;
}

.notepad-container .menu-bar .sub-menu .disabled {
  color: #6d6d6d;
  outline: none;
}
.notepad-container .menu-bar ul li:hover .sub-menu a.disabled:hover {
  background: #e6e6e6 !important;
}

.notepad-container .menu-bar > ul > li:hover a {
  background: #e5f3ff;
  outline: 1px solid #cce8ff;
}

@media screen and (max-width: 779px) {
  .notepad-container {
    width: 100%;
    overflow: hidden;
  }
}

</style>