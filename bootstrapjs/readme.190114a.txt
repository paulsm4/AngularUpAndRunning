* Angular/Bootstrap tutorial:
  - Tutorial: Styling Angular CLI v6 apps with Bootstrap
https://medium.com/@beeman/tutorial-styling-angular-cli-v6-apps-with-bootstrap-8d4f8ea5adae

  - NOTE:
    - Angular *cannot* co-exist easily with jQuery (which BootstrapJS is built on)
    - Hence the need for an "Angular-specific" version of bootstrap

  - ubuntu18:
    cd /mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs
    ng new use-bootstrap => Many strange errors

  - EXAMPLE ERRORS:
npm WARN deprecated circular-json@0.5.9: CircularJSON is in maintenance only, flatted is its successor.
npm ERR! path /mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/.webpack-sources.DELETE/node_modules/source-map
npm ERR! code ENOENT
npm ERR! errno -2
npm ERR! syscall rename
npm ERR! enoent ENOENT: no such file or directory, rename '/mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/.webpack-sources.DELETE/node_modules/source-map' -> '/mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/webpack-sources/node_modules/source-map'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/paulsm/.npm/_logs/2019-01-14T23_29_34_919Z-debug.log
Package install failed, see above.

Log file:
...
20685 verbose npm  v6.5.0-next.0
20686 error path /mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/.webpack-sources.DELETE/node_modules/source-map
20687 error code ENOENT
20688 error errno -2
20689 error syscall rename
20690 error enoent ENOENT: no such file or directory, rename '/mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/.webpack-sources.DELETE/node_modules/source-map' -> '/mnt/hgfs/D/paul/proj/AngularUpAndRunning/tutorials/bootstrapjs/use-bootstrap/node_modules/@types/webpack-sources/node_modules/source-map'
20691 error enoent This is related to npm not being able to find a file.
20692 verbose exit [ -2, true ]
  <= Bottom of 12000++ lines

  - WORKAROUND:
    - Ran "ng new" in local directory, with shorter pathname...

===================================================================================================
* Tried local directory:

  - cd ~/proj
    ng new use-bootstrap =>
Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'paulsm@ubuntu18.(none)')

  - rm -rf use-bootstrap
    git config --global user.email "paulsm@local.net"
    git config --global user.name paulsm
    ng new using-bootstrap => OK:
Binary found at /home/paulsm/proj/use-bootstrap/node_modules/node-sass/vendor/linux-x64-67/binding.node
Testing binary
Binary is fine
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 1149 packages from 1182 contributors and audited 40179 packages in 28.746s
found 0 vulnerabilities

  - cd use-bootstrap
    code .  => Start VSCode
    npm install bootstrap font=awesome => OK: bootstrap@4.2.1, font-awesome@4.7.0

  - Angular CLI: 7.2.1
Node: 11.6.0
OS: linux x64
Angular: 7.2.0
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.12.1
@angular-devkit/build-angular     0.12.1
@angular-devkit/build-optimizer   0.12.1
@angular-devkit/build-webpack     0.12.1
@angular-devkit/core              7.2.1
@angular-devkit/schematics        7.2.1
@angular/cli                      7.2.1
@ngtools/webpack                  7.2.1
@schematics/angular               7.2.1
@schematics/update                0.12.1
rxjs                              6.3.3
typescript                        3.2.2
webpack                           4.23.1
  <= Tutorial uses Angular CLI 6.0.0, Bootstrap 4.1.1, FontAwesome 4.7.0:
     *Reasonably* close...

===================================================================================================

* Incorporate styling:
  1. ng serve
     http://ubuntu18:4200
     <= ERR_CONNECTION_REFUSED
     - Only works on localhost (?!?)

     - WORKAROUND:
       ng serve --host 0.0.0.0

     - NEXT ERROR:
       Google Chrome > http://ubuntu18:4200
       <= Invalid Host header
       - http://localhost:4200 works fine; remote Chrome or FF both fail "Invalid host header"
https://github.com/angular/angular-cli/issues/6349
       <= "There is a veritable spiders web of issues pertaining to problems since the host checking was implemented in webpack-dev-server..."

     - WORKAROUND:
       ng serve --host 0.0.0.0 --disable-host-check

  2. Add stylesheets:
     - src/styles.css =>
/* You can add global styles to this file, and also import other style files */
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap/dist/css/bootstrap.css';
     <= Auto-refreshes: see font change

  3. Configure base template and UI components:
     - ng generate module ui --module app.module =>
CREATE src/app/ui/ui.module.ts (186 bytes)
UPDATE src/app/app.module.ts (371 bytes)

     - ng generate component ui/layout
       ng generate component ui/header
       ng generate component ui/footer
       <= All OK...

     - src/app/ui/layout/layout.component.html:
<app-header></app-header>
<div class="container">
  <ng-content></ng-content>
</div>
<app-footer></app-footer>

     - src/app/ui/ui.module.ts:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [ LayoutComponent]
})
export class UiModule { }

     - src/app/app.component.html
<app-layout>
  <div class="jumbotron">
    <h1>Angular CLI v6 + Bootstrap & FontAwesome</h1>
    <p>
      In this tutorial you learn how to use Angular CLI v6 with Bootstrap and FontAwesome!
    </p>
  </div>
</app-layout>
   <= At this point, we'll see the BootstrapJS JumbotronUI, FontAwesome/BootstrapJS fonts, and our message.
      We'll also see the (unimplemented!) header and footer components ("It works!")

  4. Implement the HeaderComponent:

     - src/app/ui/header/header.component.html:
<nav class="navbar navbar-dark bg-dark mb-5">
  <a class="navbar-brand" href="/">Angular & Bootstrap</a>
  <div class="navbar-expand mr-auto">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home</a>
      <a class="nav-item nav-link" href="#">About</a>
      <a class="nav-item nav-link" href="#">Contact</a>
    </div>
  </div>
  <div class="navbar-expand ml-auto navbar-nav">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="https://github.com/beeman" target="_blank">
        <i class="fa fa-github"></i>
      </a>
      <a class="nav-item nav-link" href="https://twitter.com/beeman_nl" target="_blank">
        <i class="fa fa-twitter"></i>
      </a>
      <a class="nav-item nav-link" href="https://medium.com/@beeman" target="_blank">
        <i class="fa fa-medium"></i>
      </a>
    </div>
  </div>
</nav>
  <= Now see dark navbar + navigation links at the top

  5. Implement the FooterComponent
     - src/app/ui/footer/footer.component.html:
<nav class="navbar navbar-dark bg-dark mt-5 fixed-bottom">
  <div class="navbar-expand m-auto navbar-text">
    Made with <i class="fa fa-heart"></i> by <a href="https://twitter.com/beeman_nl">beeman</a>
  </div>
</nav>

     - src/app/ui/footer/footer.component.css:
fa-heart {
  color: hotpink;
}
  <= Saw Bootstrap header, footer, body: entire layout
     Did *not* see FontAwesome "heart" icon in footer...

===================================================================================================

* Copied project to msi, rebuilt/retested from scratch (on Windows, vs. Linux)

  - cd $PROJ/bootstrapjs/use-bootstrap

  - notepad ..\run.bat:
@rem: Execute mock server
@rem EXAMPLE USAGE (from "server" sub-folder): ..\run1
if not exist node_modules (
call npm install
)
ng serve --host 0.0.0.0 --disable-host-check

  - npm install => OK
    ..\run => OK
    http://localhost:4200 => OK
    <= Still don't see FontAwesome "heart" icon in footer, though...

  
                                  