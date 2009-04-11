gelly.jar: *.pil builtin/*.pil java-support/gelly/*.java
	rm -f *.pil.h builtin/*.pil.h
	rm -rf .pil
	pilc -i gelly.pil --java -d .pil
	cp -r java-support/* .pil/
	cd .pil && javac application/Main.java
	cd .pil && jar cmf ../Manifest ../gelly.jar *

clean:
	rm -f *.pil.h builtin/*.pil.h
	rm -rf .pil
	rm -f gelly.jar
