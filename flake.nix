{
  description = "A Nix flake for an Nx project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.vercel
            nodejs_20
            cypress
            xorg.xorgserver
          ];

          shellHook = ''
            echo "Welcome to the Nx development environment"
          '';

          env = { CYPRESS_RUN_BINARY = "${pkgs.cypress}/bin/Cypress"; };
        };

      }
    );
}

