# Why does bin not need to be compiled for execution?
Bin works via TSNode by TypeStrong.  We use TSNode for both dev and prod in the CLI.

# Why did we import the app config without compiling it with typescript?
Due to the CLI being powered by TSNode, all TS files automatically get compiled.
