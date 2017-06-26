[TOC]



# 开始

You’ll need a GitHub account with admin access to at least one repository, and ideally you’ll already have a working build script that you run manually.

1. [Sign in to Travis CI](https://travis-ci.org/auth) with your GitHub account, accepting the GitHub [access permissions confirmation](https://docs.travis-ci.com/user/github-oauth-scopes).

2. Once you’re signed in, and we’ve synchronized your GitHub repositories, go to your [profile page](https://travis-ci.org/profile) and enable Travis CI for the *open source* repository you want to build. If you want to build a private repository, sign in to [Travis CI for private repositories](https://travis-ci.com/profile) instead.

3. Add a `.travis.yml` file to your repository to tell Travis CI what to build.

   This example tells Travis CI that this is a Ruby project, so unless you change the default, Travis CI uses `bundle install` to [install dependencies](https://docs.travis-ci.com/user/customizing-the-build/#Customizing-the-Installation-Step), and `rake` to build it.

   Travis CI tests this project against Ruby 2.2 and the latest versions of JRuby and Rubinius, which can all pass or fail independently.

   ```
   language: ruby
   rvm:
    - 2.2
    - jruby
    - rbx-2


   YAML
   ```

4. Add the `.travis.yml` file to git, commit and push, to trigger a Travis CI build:

   > Travis only runs builds on the commits you push *after* you’ve enabled the repository in Travis CI.

5. Check the [build status](https://travis-ci.org/) page to see if your build [passes or fails](https://docs.travis-ci.com/user/customizing-the-build/#Breaking-the-Build), according to the return status of the build command.

# 配置

`language`：[full list 支持的语言，以及用法](https://docs.travis-ci.com/user/languages/)

`sudo`：true/false 

`os`：如果你用的mac的话，该值为：osx

> You do *not* necessarily need to use OS X if you develop on a Mac, only if you need Swift, Objective-C or other macOS software.
>
> 你的应用是在mac上开发的，没有必要非要选择OSX，只有当你使用了Swift, Objective-C或者其他MAC上的应用才有必要选择`osx`

`before_install`：在执行集成前的做的操作，如：

```yaml
before_install:
	- sudo apt-get update -qq
	- sudo apt-get install -qq [packages list]
```

