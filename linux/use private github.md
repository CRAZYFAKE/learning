##### 下载脚本文件

[https://github.com/Anchor89/GithubHub](https://github.com/Anchor89/GithubHub)项目下有个文件名叫做[github.sh](https://github.com/Anchor89/GithubHub/blob/master/github.sh)

1. 在你的Github上建一个名称为root的项目，确保本机上安装了openssl和tar

2. 在`/Users/yaoyixiang/Documents/workspace`目录下创建一个文件夹叫做`private`，并把[github.sh](https://github.com/Anchor89/GithubHub/blob/master/github.sh)复制进去

3. 然后在`private`里执行

   ```shell
   git clone https://github.com/CRAZYFAKE/root.git
   ```

   在`private`下会出现root文件夹

4. 进入leaf文件夹，用`git init --bare`新建一个本地的裸git库，假设名字叫`secret`

5. 随便换到其他一个目录下，git clone path/some_dir/leaf/secret，就建立了裸库的工作目录了，然后在这个目录下像平常一样做一些修改，提交，推送。这时的推送（push）是将更改的内容push到本地leaf/secret的裸git库中，如果要更新到github上，还需要下面一步。

6. 调用github.sh push secret，其中secret是你想push到github上的库的名字，这个命令会把leaf文件件下的secret文件夹打包压缩，然后放到root文件夹下。然后在root下执行git add secret && git commit .. & git push。至此，你的内容就被加密存放到Github上root库下了

7. 当你想从Github上获取加密的文件时，请用github.sh pull secret。这个命令会将root的内容pull到本地，然后把root下的secret解密解压到leaf文件夹下成为secret文件夹，之后从本机的其他文件夹里继续pull就可以了



